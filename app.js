// jshint esversion:6

require('dotenv').config(); // to access environment variables in .env

const express = require("express"); // for making node server using express
const ejs = require("ejs"); // for using ejs templates
const bodyParser = require("body-parser"); // for parsing form inputs
const flash = require("connect-flash");  // for storing messages and flash them
const mongoose = require("mongoose"); // for using mongodb database

// For Authentication
const session = require("express-session");
const passport = require("passport");

// Initializing Express App
const app = express();

// Setting view engine
app.set("view engine", "ejs");

// Excessing files publically
app.use(express.static(__dirname + "/public"));

// To parse the form input values
app.use(bodyParser.urlencoded({
  extended: true
}));

// Initializing session
app.use(session({
  secret: process.env.TAAS_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Initializing passport and passport with session
app.use(passport.initialize());
app.use(passport.session());

// Connecting flash
app.use(flash());

// Route Response local variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// Connecting with Database Server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(function() {
  console.log("Succesfully connected with Database Server");
}).catch(function (err) {
  console.log(err);
});

// Index Routes
app.use("/", require(__dirname + "/routes/index"));

// Authentication Routes
app.use("/auth", require(__dirname + "/routes/auth"));

// Listening the requests at this port
const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log("Server running on PORT " + PORT);
});
