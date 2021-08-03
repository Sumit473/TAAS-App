// jshint esversion:6

// Username validation
$(".form-group #formUsername").keyup(function() {
  const inputVal = $(this).val();

  if (inputVal) {
    if (validateUsername(inputVal)) {
      validInput(this);
      isValidUsername = true;
    } else {
      if (!/^[A-Z]/.test(inputVal)) {
        $(this).parent().children(".invalid-feedback").text("Username should start from capital letter.");
      }else if (inputVal.length < 5) {
        $(this).parent().children(".invalid-feedback").text("Username is too short.");
      } else if (inputVal.length > 16) {
        $(this).parent().children(".invalid-feedback").text("Username is too long.");
      } else {
        $(this).parent().children(".invalid-feedback").text("Username can only contain alphanumeric characters or single hyphens.");
      }

      inValidInput(this);
      isValidUsername = false;
    }

  } else {
    emptyInput(this);
    isValidUsername = false;
  }
});



//DropZone
$(".drop-zone").on("dragover", function(e) {
  e.preventDefault();
  $(this).addClass("drop-zone-over");
  $(this).children(".cloud").removeClass("transparent-cloud");
});

$(".drop-zone").on("dragleave", function() {
  $(this).removeClass("drop-zone-over");
  $(this).children(".cloud").addClass("transparent-cloud");
});

function updateThumbnail(imgFile) {
  const fileName = imgFile.name.split(".");
  let name = "";

  for (let i = 0; i < fileName.length - 1; i++) {
    name += fileName[i] + ".";
  }

  name = name.substring(0, 15);

  if (!name.endsWith(".")) {
    name = name + ".";
  }

  name = name + fileName[fileName.length - 1];

  $(".drop-zone .drop-zone-thumb").attr("data-profileImg", name.toLowerCase());

  const reader = new FileReader();
  reader.readAsDataURL(imgFile);

  reader.onload = function() {
    $(".drop-zone .drop-zone-thumb").css("background-image", 'url(' + reader.result + ')');
  };

  $(".drop-zone-thumb i").css("display", "inline");
  $(".drop-zone .cloud").removeClass("transparent-cloud");
}

$(".drop-zone").on("drop", function(e) {
  e.preventDefault();
  $(this).removeClass("drop-zone-over");
  $(".drop-zone .cloud").addClass("transparent-cloud");

  const imgFileList = e.originalEvent.dataTransfer.files;

  if (imgFileList.length && imgFileList[0].type.startsWith("image/")) {
    const inputElement = $(".drop-zone-prompt .browse input")[0];
    inputElement.files = imgFileList;
    updateThumbnail(imgFileList[0]);
  }
});

$(".drop-zone-prompt .browse input").on("change", function() {
  const imgFileList = $(this)[0].files;

  if (imgFileList.length && imgFileList[0].type.startsWith("image/")) {
    updateThumbnail(imgFileList[0]);
  }
});

$(".drop-zone-thumb i").on("click", function() {
  $(".drop-zone .drop-zone-thumb").css("background-image", 'url("../images/default-profile.jpg")');
  $(".drop-zone .drop-zone-thumb").attr("data-profileImg", "default-profile.jpg");
  $(".drop-zone-thumb i").css("display", "none");
  $(".drop-zone .cloud").addClass("transparent-cloud");
  $(".drop-zone-prompt .browse input")[0].value = "";
});



// Password validation and Confirm Password
let isPasswordMatch = false;

$(".form-group #formPassword").keyup(function() {
  const inputVal = $(this).val();

  if (inputVal) {
    $(".password-validity").removeClass("hide-validity");
    $(".password-validity").addClass("show-validity");

    if (validatePassword(inputVal)) {
      $(".password-validity-pill").css("background-color", "#28A745");
      $(".password-validation-summary").text("Password is strong.");
      $(".password-validation-summary").css("color", "#28A745");
      isValidPassword = true;
    } else {
      if (inputVal.length < 8) {
        $(".password-validity-pill").css("background-color", "rgba(126, 125, 127, 0.6)");
        $(".password-validity-pill:nth-child(1)").css("background-color", "#DC3545");
        $(".password-validation-summary").text("Password is too short.");
        $(".password-validation-summary").css("color", "#DC3545");
      } else {
        $(".password-validity-pill").css("background-color", "#FFD33D");
        $(".password-validity-pill:nth-child(3)").css("background-color", "rgba(126, 125, 127, 0.6)");
        $(".password-validation-summary").text("Password needs a number and upercase letter.");
        $(".password-validation-summary").css("color", "#FFD33D");
      }

      isValidPassword = false;
    }
  } else {
    $(".password-validity").removeClass("show-validity");
    $(".password-validity").addClass("hide-validity");

    isValidPassword = false;
  }

  confirmPass(".form-group #formConfirmPass");
});

function confirmPass(element) {
  const inputVal = $(element).val();

  if (inputVal) {
    if (inputVal == $(".form-group #formPassword").val()) {
      validInput(element);
      isPasswordMatch = true;
    } else {
      inValidInput(element);
      isPasswordMatch = false;
    }
  } else {
    emptyInput(element);
    isPasswordMatch = false;
  }
}

$(".form-group #formConfirmPass").keyup(function() {
  confirmPass(this);
});

// Submission or not
function controllSubmission(e) {
  if (isValidUsername && isValidEmail && isValidPassword && isPasswordMatch && isCheck) {
    e.defaultPrevented = false;
  }
  else {
    e.preventDefault();
  }
}
