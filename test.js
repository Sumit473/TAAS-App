// jshint esversion:6

require('dotenv').config(); // to access environment variables in .env

const express = require("express"); // for making node server using express
const ejs = require("ejs"); // for using ejs templates
const bodyParser = require("body-parser"); // for parsing form inputs
const mongoose = require("mongoose"); // for using mongodb database

// For Authentication
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

// Google OAuth
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Facebook OAuth
const FacebookStrategy = require('passport-facebook').Strategy;

const fs = require("fs"); // for file operations
const multer = require("multer"); // for storing uploaded data

// DB Models
const adminModel = require(__dirname + "/db-models/admin-model.js");
const imageModel = require(__dirname + "/db-models/image-model.js");
const mentorModel = require(__dirname + "/db-models/member-models/mentor-model.js");
const executiveMemberModel = require(__dirname + "/db-models/member-models/executive-member-model.js");
const coreMemberModel = require(__dirname + "/db-models/member-models/core-member-model.js");

// Initializing Express App
const app = express();

// Setting view engine
app.set("view engine", "ejs");

// Excessing files publically
app.use(express.static("public"));

// To parse the form input values
app.use(bodyParser.urlencoded({
  extended: true
}));

// Initializing session
app.use(session({
  secret: "TAAS is an astronomy society.",
  resave: false,
  saveUninitialized: false
}));

// Initializing passport and passport with session
app.use(passport.initialize());
app.use(passport.session());

// Connecting with Database Server
mongoose.connect("mongodb://localhost:27017/taasDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// Local Login In strategy using username and password
passport.use(adminModel.Admin.createStrategy());

// serializing and deserializing the user using diffferent strategies
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  adminModel.Admin.findById(id, function(err, user) {
    done(err, user);
  });
});

// Goggle Strategy to Login and getting the profile and access token
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/manage-members",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
}, function(accessToken, refreshToken, profile, cb) {
  adminModel.Admin.findOneAndUpdate({username: profile.emails[0].value}, {googleId: profile.id}, function(err, doc) {
    return cb(err, doc);
  });
}));

// Facebook Strategy to Login and getting the profile and access token
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/manage-members",
    profileFields: ["emails", "name"]
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    adminModel.Admin.findOneAndUpdate({username: profile.emails[0].value}, {facebookId: profile.id}, function(err, doc) {
      return cb(err, doc);
    });
  }
));


// Image Storage Specification
var imageStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, __dirname + "/uploads/images");
  },
  filename: function(req, file, cb) {
    const fileNameAndExtension = file.originalname.split(".");
    let fileName = "";
    for (let i = 0; i < fileNameAndExtension.length - 1; i++) {
      fileName = fileName + fileNameAndExtension[i];
    }
    fileName = fileName + "-" + Date.now() + "." + fileNameAndExtension[fileNameAndExtension.length - 1];
    cb(null, fileName);
  }
});
let imageUpload = multer({
  storage: imageStorage
});

// Get and Post Requests
app.get("/", function(req, res) {
  res.render("home");
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.get("/login", function(req, res) {
  res.render("login");
});

// Google Sign for user profile
app.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

// Redirect Page after Google Login
app.get("/auth/google/manage-members", passport.authenticate("google", {
  failureRedirect: "/login"
}), function(req, res) {
  // Successful authentication, redirect manage-members.
  res.redirect("/manage-members");
});

// Facebook Sign for user profile
app.get("/auth/facebook", passport.authenticate("facebook", {
  scope: ["email"]
}));

app.get("/auth/facebook/manage-members",
  passport.authenticate("facebook", {
    failureRedirect: "/login"
  }),
  function(req, res) {
    // Successful authentication, redirect manage-members.
    res.redirect("/manage-members");
  });

app.post("/register", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const secret = req.body.secret;

  if (secret === process.env.TAAS_SECRET) {
    adminModel.Admin.register({
      username: username
    }, password, function(err, user) {
      if (err) {
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function() {
          res.redirect("/manage-members");
        });
      }
    });
  } else {
    res.redirect("register");
  }
});

app.post("/login", function(req, res) {
  const admin = new adminModel.Admin({
    username: req.body.username,
    password: req.body.password
  });

  req.login(admin, function(err) {
    if (err) {
      console.log(err);
      res.redirect("/login");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/manage-members");
      });
    }
  });
});

app.get("/core-members", function(req, res) {
  coreMemberModel.CoreMember.find(function(err, coreMembers) {
    if (err) {
      console.log(err);
    } else {
      res.render("team/core-members", {
        coreMembers: coreMembers
      });
    }
  });
});

app.get("/manage-members", function(req, res) {
  if (req.isAuthenticated()) {
    mentorModel.Mentor.find(function(err, mentors) {
      executiveMemberModel.ExecutiveMember.find(function(err, executiveMembers) {
        coreMemberModel.CoreMember.find(function(err, coreMembers) {
          if (err) {
            console.log(err);
          }
          res.render("admin/manage-members", {
            mentors: mentors,
            executiveMembers: executiveMembers,
            coreMembers: coreMembers
          });
        });
      });
    });
  } else {
    res.redirect("/register");
  }
});

app.post("/add-mentor", imageUpload.single("profile-img"), function(req, res) {
  let filePath = "";
  let contentType = "";
  if (req.file === undefined) {
    filePath = "public/images/admin/manage-members/default-profile.jpg";
    contentType = "image/jpg";
  } else {
    filePath = __dirname + "/uploads/images/" + req.file.filename;
    contentType = "image/" + req.file.filename.split(".")[req.file.filename.split(".").length - 1];
  }

  const profileImg = new imageModel.Image({
    data: fs.readFileSync(filePath),
    contentType: contentType
  });

  const mentor = {
    name: req.body.name,
    designation: req.body.designation,
    specialization: req.body.specialization,
    profileImg: profileImg,
    description: req.body.description
  };

  mentorModel.Mentor.create(mentor, function(err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/manage-members");
  });
});

app.post("/update-mentor/:id", imageUpload.single("profile-img"), function(req, res) {
  if (req.file !== undefined) {
    const filePath = __dirname + "/uploads/images/" + req.file.filename;
    const contentType = "image/" + req.file.filename.split(".")[req.file.filename.split(".").length - 1];

    const profileImg = new imageModel.Image({
      data: fs.readFileSync(filePath),
      contentType: contentType
    });

    mentorModel.Mentor.updateOne({
      _id: req.params.id
    }, {
      name: req.body.name,
      designation: req.body.designation,
      profileImg: profileImg
    }, function(err) {
      if (err) {
        console.log(err);
      }
      res.redirect("/manage-members");
    });
  } else {
    mentorModel.Mentor.updateOne({
      _id: req.params.id
    }, {
      name: req.body.name,
      designation: req.body.designation,
    }, function(err) {
      if (err) {
        console.log(err);
      }
      res.redirect("/manage-members");
    });
  }
});

app.post("/delete-mentor/:id", function(req, res) {
  mentorModel.Mentor.deleteOne({
    _id: req.params.id
  }, function(err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/manage-members");
  });
});

app.post("/add-executive-member", imageUpload.single("profile-img"), function(req, res) {
  let filePath = "";
  let contentType = "";
  if (req.file === undefined) {
    filePath = "public/images/admin/manage-members/default-profile.jpg";
    contentType = "image/jpg";
  } else {
    filePath = __dirname + "/uploads/images/" + req.file.filename;
    contentType = "image/" + req.file.filename.split(".")[req.file.filename.split(".").length - 1];
  }

  const profileImg = new imageModel.Image({
    data: fs.readFileSync(filePath),
    contentType: contentType
  });

  const executiveMember = {
    name: req.body.name,
    designation: req.body.designation,
    interests: [req.body.interest1, req.body.interest2, req.body.interest3],
    profileImg: profileImg,
    description: req.body.description
  };

  executiveMemberModel.ExecutiveMember.create(executiveMember, function(err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/manage-members");
  });
});

app.post("/update-executive-member/:id", imageUpload.single("profile-img"), function(req, res) {
  if (req.file !== undefined) {
    const filePath = __dirname + "/uploads/images/" + req.file.filename;
    const contentType = "image/" + req.file.filename.split(".")[req.file.filename.split(".").length - 1];

    const profileImg = new imageModel.Image({
      data: fs.readFileSync(filePath),
      contentType: contentType
    });

    executiveMemberModel.ExecutiveMember.updateOne({
      _id: req.params.id
    }, {
      name: req.body.name,
      designation: req.body.designation,
      profileImg: profileImg
    }, function(err) {
      if (err) {
        console.log(err);
      }
      res.redirect("/manage-members");
    });
  } else {
    executiveMemberModel.ExecutiveMember.updateOne({
      _id: req.params.id
    }, {
      name: req.body.name,
      designation: req.body.designation,
    }, function(err) {
      if (err) {
        console.log(err);
      }
      res.redirect("/manage-members");
    });
  }
});

app.post("/delete-executive-member/:id", function(req, res) {
  executiveMemberModel.ExecutiveMember.deleteOne({
    _id: req.params.id
  }, function(err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/manage-members");
  });
});

app.post("/add-core-member", imageUpload.single("profile-img"), function(req, res) {
  let filePath = "";
  let contentType = "";
  if (req.file === undefined) {
    filePath = "public/images/admin/manage-members/default-profile.jpg";
    contentType = "image/jpg";
  } else {
    filePath = __dirname + "/uploads/images/" + req.file.filename;
    contentType = "image/" + req.file.filename.split(".")[req.file.filename.split(".").length - 1];
  }

  const profileImg = new imageModel.Image({
    data: fs.readFileSync(filePath),
    contentType: contentType
  });

  const coreMember = {
    name: req.body.name,
    batch: req.body.batch,
    societyWork: req.body.societyWork,
    interests: [req.body.interest1, req.body.interest2, req.body.interest3],
    profileImg: profileImg,
    description: req.body.description
  };

  coreMemberModel.CoreMember.create(coreMember, function(err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/manage-members");
  });
});

app.post("/update-core-member/:id", imageUpload.single("profile-img"), function(req, res) {
  if (req.file !== undefined) {
    const filePath = __dirname + "/uploads/images/" + req.file.filename;
    const contentType = "image/" + req.file.filename.split(".")[req.file.filename.split(".").length - 1];

    const profileImg = new imageModel.Image({
      data: fs.readFileSync(filePath),
      contentType: contentType
    });

    coreMemberModel.CoreMember.updateOne({
      _id: req.params.id
    }, {
      name: req.body.name,
      societyWork: req.body.societyWork,
      profileImg: profileImg
    }, function(err) {
      if (err) {
        console.log(err);
      }
      res.redirect("/manage-members");
    });
  } else {
    coreMemberModel.CoreMember.updateOne({
      _id: req.params.id
    }, {
      name: req.body.name,
      societyWork: req.body.societyWork
    }, function(err) {
      if (err) {
        console.log(err);
      }
      res.redirect("/manage-members");
    });
  }
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/events", function(req, res) {
  res.render("events");
});

app.get("/:error", function(req, res) {
  res.render("404");
});

app.post("/404", function(req, res) {
  res.redirect("/");
});

// Listening the requests at this port
app.listen(3000, function() {
  console.log("Server has started on port 3000");
});
