// jshint esversion:6

const express = require("express");

const router = express.Router();

const coreMemberModel = require(__dirname + "/../db-models/member-models/core-member-model.js");

router.use(express.static(__dirname + "/../public"));

router.get("/", function(req, res) {
  res.render("home");
});

router.get("/about", function(req, res) {
  res.render("about");
});

router.get("/events", function(req, res) {
  res.render("events");
});

router.get("/core-members", function(req, res) {
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

router
  .route("/admin-home")
  .get(function(req, res) {
    console.log("logged In");
  });

router.get("/:error", function(req, res) {
  res.render("404");
});

module.exports = router;
