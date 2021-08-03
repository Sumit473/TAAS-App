// jshint esversion:6

const multer = require("multer"); // for storing uploaded data

// Image Storage Specification
const imageStorage = multer.diskStorage({
  destination: __dirname + "/../uploads/images/admins",
  filename: function(req, file, cb) {
    const fileNameAndExtension = file.originalname.split(".");
    let fileName = "";

    for (let i = 0; i < fileNameAndExtension.length - 1; i++) {
      fileName = fileName + fileNameAndExtension[i];
    }

    fileName = fileName + "-" + Date.now() + "." + fileNameAndExtension[fileNameAndExtension.length - 1];

    cb(null, fileName);
  }
});

exports.imageUpload = multer({
  storage: imageStorage
});
