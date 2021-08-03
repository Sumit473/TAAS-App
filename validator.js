// jshint esversion:6

exports.validateUsername = function(name) {
  const regex = /^([A-Z]-?)+([a-zA-Z0-9]-?){4,15}$/;
  return regex.test(name);
};

exports.validateEmail = function(email) {
  const regex = /^([a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com|[a-z0-9_]{5,}@thapar\.edu)$/;
  return regex.test(email);
};

exports.validatePassword = function(password) {
  const regex = /^((?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}|[a-zA-Z0-9!@#$%^&*]{15,})$/;
  return regex.test(password);
};
