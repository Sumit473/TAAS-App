// jshint esversion:6
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_ADMIN,
    pass: process.env.AUTH_ADMIN_PASS
  }
});

exports.sendMail = function(body) {
  const mailOptions = {
    from: "'Auth Admin' <" + process.env.AUTH_ADMIN + ">",
    to: process.env.AUTH_ADMIN,
    subject: "User Account Verification for TAAS Admin",
    html: body
  };

  let isSend = true;

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      isSend = false;
    }
  });

  return isSend;
};
