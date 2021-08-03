// jshint esversion:6

const mongoose = require("mongoose");
const imageModel = require(__dirname + "/../image-model.js");

const coreMemberSchema = new mongoose.Schema({
  name: String,
  batch: String,
  societyWork: String,
  interests: [
    {
      type: String,
      default: ""
    }
  ],
  profileImg: imageModel.imageSchema,
  description: String
});

exports.coreMemberSchema = coreMemberSchema;
exports.CoreMember = new mongoose.model("CoreMember", coreMemberSchema);
