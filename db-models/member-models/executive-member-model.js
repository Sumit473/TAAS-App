// jshint esversion:6

const mongoose = require("mongoose");
const imageModel = require(__dirname + "/../image-model.js");

const executiveMemberSchema = new mongoose.Schema({
  name: String,
  designation: String,
  interests: [
    {
      type: String,
      default: ""
    }
  ],
  profileImg: imageModel.imageSchema,
  description: String
});

exports.executiveMemberSchema = executiveMemberSchema;
exports.ExecutiveMember = new mongoose.model("ExecutiveMember", executiveMemberSchema);
