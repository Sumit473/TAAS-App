//jshint esversion:6

const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const imageModel = require(__dirname + "/image-model.js");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  profileImg: imageModel.imageSchema,
  googleId: String,
  facebookId: String
});

// will Hash and Salt the password and save User into database
adminSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

exports.Admin = new mongoose.model("Admin", adminSchema);
