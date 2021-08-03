// jshint esversion:6

// Input Labels
$(".form-group input, .form-group textarea").on("focusin", function() {
  $(this).parent().children(":first-child").removeClass("margin-label");
  $(this).parent().children(":first-child").addClass("unmargin-label");
  $(this).css("border-color", "#BB1981");
});

$(".form-group input, .form-group textarea").on("focusout", function() {
  if ($(this).val() === "") {
    $(this).parent().children(":first-child").removeClass("unmargin-label");
    $(this).parent().children(":first-child").addClass("margin-label");
  }
});

// Acknowledge Validation
function validInput(inputElement) {
  $(inputElement).removeClass("is-invalid");
  $(inputElement).addClass("is-valid");
}

function inValidInput(inputElement) {
  $(inputElement).removeClass("is-valid");
  $(inputElement).addClass("is-invalid");
}

function emptyInput(inputElement) {
  $(inputElement).removeClass("is-valid");
  $(inputElement).removeClass("is-invalid");
}

// Validation Criteria
let isValidName = false;
function validateName(name) {
  const regex = /^([a-zA-Z/.]{2,30}\s)*([a-zA-Z]{2,30})+$/;
  return regex.test(name);
}

let isValidUsername = false;
function validateUsername(name) {
  const regex = /^([A-Z]-?)+([a-zA-Z0-9]-?){4,15}$/;
  return regex.test(name);
}

let isValidEmail = false;
function validateEmail(email) {
  const regex = /^([a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com|[a-z0-9_]{5,}@thapar\.edu)$/;
  return regex.test(email);
}

let isValidPassword = false;
function validatePassword(password) {
  const regex = /^((?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}|[a-zA-Z0-9!@#$%^&*]{15,})$/;
  return regex.test(password);
}

let isValidPhone = true;
function validatePhoneNumber(phoneNo) {
  const regex = /([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})/;
  return regex.test(phoneNo);
}

// Validation
function formValidation(element, validationCriteria) {
  $(element).keyup(function() {
    const inputVal = $(this).val();
    const elementId = $(this).attr("id");

    if (inputVal !== "") {
      if (validationCriteria(inputVal)) {
        validInput(this);

        if (elementId === "formYourName") {
          isValidName = true;
        } else {
          isValidPhone = true;
        }
      } else {
        inValidInput(this);

        if (elementId === "formYourName") {
          isValidName = false;
        } else {
          isValidPhone = false;
        }
      }
    } else {
      emptyInput(this);

      if (elementId === "formYourName") {
        isValidName = false;
      } else {
        isValidPhone = true;
      }
    }
  });
}

// Email Validation
$(".form-group #formEmail").keyup(function() {
  const inputVal = $(this).val();

  if (inputVal !== "") {
    if (validateEmail(inputVal)) {
      validInput(this);
      isValidEmail = true;
      $(this).parent().children(".focus-line").css("background-color", "#BB1981");
    } else {
      inValidInput(this);
      isValidEmail = false;
      $(this).parent().children(".focus-line").css("background-color", "#DC3545");
    }
  } else {
    emptyInput(this);
    isValidEmail = false;
    $(this).parent().children(".focus-line").css("background-color", "#BB1981");
  }
});

// Text Validation
$(".form-group #formMessage").keyup(function() {
  const inputVal = $(this).val();

  if (inputVal !== "") {
    validInput(this);
  } else {
    emptyInput(this);
  }
});
