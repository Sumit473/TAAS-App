//jshint esversion:6

const passport = require("passport");
const jwt = require("jsonwebtoken"); // to generate Json Web Token
const fs = require("fs"); // for file operations

const adminModel = require(__dirname + "/../../db-models/admin-model.js");
const imageModel = require(__dirname + "/../../db-models/image-model.js");

const validator = require(__dirname + "/../../validator.js");
const operateAdmin = require(__dirname + "/../../model-operations/operate-admin.js");
const mailController = require(__dirname + "/../mail-controller.js");

// Local Authentication strategy using Username and Password
passport.use(adminModel.Admin.createStrategy());

// Register Handler
exports.registerHandler = function(req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPass = req.body.confirmPass;

  // Firstly Validating fields at server level
  if (!username || !email || !password) {
    req.flash("error_msg", "Please enter all fields.");
  } else if (!validator.validateUsername(username) || !validator.validateEmail(email || !validator.validatePassword(password) || password !== confirmPass)) {
    req.flash("error_msg", "Invalid Input fields.");
  } else if (operateAdmin.findAdmin({
      username: username
    })) {
    req.flash("error_msg", "Username " + username + " is not available.");
  } else if (operateAdmin.findAdmin({
      email: email
    })) {
    req.flash("error_msg", "Email " + email + " is already taken.");
  } else {
    let filePath = "";
    let contentType = "";

    if (req.file === undefined) {
      filePath = __dirname + "/../../public/images/default-profile.jpg";
      contentType = "image/jpg";
    } else {
      filePath = __dirname + "/../../uploads/images/admins" + "/" + req.file.filename;
      contentType = "image/" + req.file.filename.split(".")[req.file.filename.split(".").length - 1];
    }

    // Making JWT for Activation link
    const token = jwt.sign({
      username,
      email,
      password,
      filePath,
      contentType
    }, process.env.JWT_KEY, {
      expiresIn: "5m"
    });

    // Sending mail to the Auth Admin
    const CLIENT_URL = "http://" + req.headers.host;
    const body = `<h3>Admin Email: <a href="mailto:${email}">${email}</a></h3>
                  <h3>Username: ${username}</h3>
                  <br/>
                  <h2>Click on the link below to verify user as a TAAS Admin.</h2>
                  <p>${CLIENT_URL}/auth/verify_admin/${token}</p>
                  <p><b>NOTE: </b> The above activation link will expire in 5 mins.</p>
                `;

    if (mailController.sendMail(body)) {
      req.flash("success_msg", "Verification link is sent to TAAS Auth Admin (Valid for 5 min).");
    } else {
      req.flash("error_msg", "Something went wrong on our end. Please try to register later.");
    }
  }

  res.redirect("/auth/register");
};

exports.verifyAdminHandler = function(req, res) {
  const token = req.params.token;

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, function(err, decodedToken) {
      if (err) {
        if (err.name === "TokenExpiredError") {
          req.flash("error_msg", "The link you followed has expired! Please acknowledge user to register again.");
          res.redirect("/auth/register");
        } else {
          res.redirect("/404");
        }
      } else {
        const profileImg = new imageModel.Image({
          data: fs.readFileSync(decodedToken.filePath),
          contentType: decodedToken.contentType
        });

        adminModel.Admin.register({
          username: decodedToken.username,
          email: decodedToken.email,
          profileImg: profileImg
        }, decodedToken.password, function(err, user) {
          if (err) {
            req.flash("error_msg", "Something went wrong to your end. Please try again later.");
            res.redirect("/auth/register");
          } else {
            req.flash("success_msg", "Account verified! Please LogIn.");
            res.redirect("/auth/login");
          }
        });
      }
    });
  } else {
    res.redirect("/404");
  }
};

exports.loginHandler = function(req, res) {
  const usernameOrEmail = req.body.user;
  const password = req.body.password;

  if (!usernameOrEmail || !password) {
    req.flash("error_msg", "Please enter all fields.");
    res.redirect("/auth/login");
  } else {
    const admin = new adminModel.Admin({
      email: usernameOrEmail,
      password: password
    });
    req.login(admin, function(err) {
      if (err) {
        req.flash("error_msg", "Invalid Credentials!");
        res.redirect("/auth/login");
        console.log("hello1");
      } else {
        console.log("hello3");
        passport.authenticate("local")(req, res, function() {
          res.redirect("/admin-home");
          console.log("hello2");
        });
      }
    });
  }
};
