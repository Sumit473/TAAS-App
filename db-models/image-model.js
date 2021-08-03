// jshint esversion:6

const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String
});

exports.imageSchema = imageSchema;
exports.Image = new mongoose.model("Image", imageSchema);
