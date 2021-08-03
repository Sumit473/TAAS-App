// jshint esversion:6

const express = require("express");
const passport = require("passport");

const adminModel = require(__dirname + "/../db-models/admin-model.js");

const localAuthController = require(__dirname + "/../controllers/auth/local-auth-controller.js");
const imageController = require(__dirname + "/../controllers/image-controller.js");

const router = express.Router();

router.use(express.static(__dirname + "/../public"));

// serializing and deserializing the user using diffferent strategies
passport.serializeUser(function(admin, done) {
  done(null, admin.id);
});

passport.deserializeUser(function(id, done) {
  adminModel.Admin.findById(id, function(err, admin) {
    done(err, admin);
  });
});

require(__dirname + "/../controllers/auth/google-auth-controller.js");
require(__dirname + "/../controllers/auth/facebook-auth-controller.js");

router
  .route("/register")
  .get(function(req, res) {
    res.render("register");
  })
  .post(imageController.imageUpload.single("profileImg"), localAuthController.registerHandler);

// Login Route and Post Handler
router
  .route("/login")
  .get(function(req, res) {
    res.render("login");
  })
  .post(localAuthController.loginHandler);

router.get("/verify_admin/:token", localAuthController.verifyAdminHandler);

// Google Sign for user profile
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

// Redirect Page after Google Login
router.get("/google/admin-home", passport.authenticate("google", {
  failureRedirect: "/auth/login"
}), function(req, res) {
  // Successful authentication, redirect admin-home.
  res.redirect("/admin-home");
});

// Facebook Sign for user profile
router.get("/facebook", passport.authenticate("facebook", {
  scope: ["email"]
}));

// Redirect Page after Google Login
router.get("/facebook/manage-members", passport.authenticate("facebook", {
  failureRedirect: "/auth/login"
}),
  function(req, res) {
    // Successful authentication, redirect admin-home.
    res.redirect("/admin-home");
});

module.exports = router;
