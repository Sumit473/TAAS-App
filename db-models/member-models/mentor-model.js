// jshint esversion:6

const mongoose = require("mongoose");
const imageModel = require(__dirname + "/../image-model.js");

const mentorSchema = new mongoose.Schema({
  name: String,
  designation: String,
  specialization: String,
  profileImg: imageModel.imageSchema,
  description: String
});

exports.mentorSchema = mentorSchema;
exports.Mentor = new mongoose.model("Mentor", mentorSchema);
