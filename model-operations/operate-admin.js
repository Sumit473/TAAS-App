// jshint esversion:6

const adminModel = require(__dirname + "/../db-models/admin-model.js");

exports.findAdmin = function(findBy) {
  let isFound = false;
  adminModel.Admin.find(findBy, function (err, foundAdmin) {
    if (foundAdmin) {
      isFound = true;
    }
  });

  return isFound;
};
