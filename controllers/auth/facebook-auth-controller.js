// jshint esversion:6
const passport = require("passport");

const FacebookStrategy = require('passport-facebook').Strategy;

const adminModel = require(__dirname + "/../../db-models/admin-model.js");

// Facebook Strategy to Login and getting the profile and access token
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/manage-members",
    profileFields: ["emails", "name"]
  },
  function(accessToken, refreshToken, profile, cb) {
    adminModel.Admin.UpdateOne({email: profile.emails[0].value}, {facebookId: profile.id}, function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        return cb(err, doc);
      }
    });
  }
));
