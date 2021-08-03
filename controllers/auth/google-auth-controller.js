// jshint esversion:6
const passport = require("passport");

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const adminModel = require(__dirname + "/../../db-models/admin-model.js");

// Goggle Strategy to Login and getting the profile and access token
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/admin-home",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
}, function(accessToken, refreshToken, profile, cb) {
  adminModel.Admin.findOneAndUpdate({email: profile.emails[0].value}, {googleId: profile.id}, function (err, doc) {
    return cb(err, doc);
  });
}));
