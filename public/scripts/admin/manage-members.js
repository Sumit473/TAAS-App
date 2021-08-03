// jshint esversion:6
if (window.location.hash && window.location.hash == '#_=_') {
    window.location.hash = '';
}

$(document).on("click", function() {
  $(".dropdown-menu").hide();
});

$(".member-type button").on("click", function() {
  $(".dropdown-menu").show();
});

let memberType = "Mentor";

$(".member-type .dropdown-item").on("click", function() {
  memberType = $(this).text();
  $(".chosen-member div:eq(1)").text(memberType);
});

$(".add-member button:eq(1)").on("click", function() {
  if (memberType === "Mentor") {
    $(this).attr("data-target", '#mentorModal');
    $('#mentorsModal').modal('show');
  }
  else if (memberType === "Executive Member") {
    $(this).attr("data-target", '#executiveMemberModal');
    $('#executiveMembersModal').modal('show');
  }
  else if (memberType === "Core Member") {
    $(this).attr("data-target", '#coreMemberModal');
    $('#coreMemberModal').modal('show');
  }
  else {
    $(this).attr("data-target", '#memberModal');
    $('#memberModal').modal('show');
  }
});


$(".update-executor i").hover(function() {
  $(this).parent().parent().children("img").css("filter", "brightness(0.6)");
  $(this).parent().parent().children(".img-outline").css("border-color", "#BB1981");
}, function() {
  $(this).parent().parent().children("img").css("filter", "brightness(1)");
  $(this).parent().parent().children(".img-outline").css("border-color", "#78C6DC");
});

$(".update-executor .edit-profile-photo input").on("change", function() {
  const inputElement = $(this);
  const imgFileList = $(this)[0].files;

  if (imgFileList.length && imgFileList[0].type.startsWith("image/")) {
    const reader = new FileReader();
    reader.readAsDataURL(imgFileList[0]);
    reader.onload = function() {
      inputElement.parent().parent().children("img").attr("src", reader.result);
    };
  }
});

function preventSubmitForm(e) {
  e.preventDefault();
}

function submitForm(e) {
  e.defaultPrevented = false;
}

$(".change-intro .form-group input").keyup(function() {
  if ($(this).val().length < 3 || $(this).val().length > 30) {
    $(this).removeClass("is-valid");
    $(this).addClass("is-invalid");
    $(this).parent().parent().parent().parent().attr("onsubmit", "preventSubmitForm(event)");
  }
  else {
    $(this).removeClass("is-invalid");
    $(this).addClass("is-valid");
    $(this).parent().parent().parent().parent().attr("onsubmit", "submitForm(event)");
  }
});

$(".modal-form .drop-zone").on("dragover", function(e) {
  e.preventDefault();
  $(".modal").css("cursor", "grab");
  $(this).addClass("drop-zone-over");
  $(this).children("i").removeClass("cloud");
});

$(".modal-form .drop-zone").on("dragleave", function() {
  $(".modal").css("cursor", "grab");
  $(this).removeClass("drop-zone-over");
  $(this).children("i").addClass("cloud");
});

function updateThumbnail(imgFile) {
  $(".drop-zone .drop-zone-thumb").attr("data-label", imgFile.name);

  const reader = new FileReader();
  reader.readAsDataURL(imgFile);

  reader.onload = function() {
    $(".drop-zone .drop-zone-thumb").css("background-image", 'url(' + reader.result + ')');
  };
}

$(".modal-form .drop-zone").on("drop", function(e) {
  e.preventDefault();
  $(".modal").css("cursor", "default");
  $(this).removeClass("drop-zone-over");

  const imgFileList = e.originalEvent.dataTransfer.files;

  if (imgFileList.length && imgFileList[0].type.startsWith("image/")) {
    const inputElement = $(".drop-zone-prompt .browse input")[0];
    inputElement.files = imgFileList;
    updateThumbnail(imgFileList[0]);
    $(".drop-zone-thumb i").css("display", "inline");
  }
});

$(".drop-zone-prompt .browse input").on("change", function() {
  const imgFileList = $(this)[0].files;

  if (imgFileList.length && imgFileList[0].type.startsWith("image/")) {
    updateThumbnail(imgFileList[0]);
    $(".drop-zone-thumb i").css("display", "inline");
  }
});

$(".drop-zone-thumb i").on("click", function() {
  $(".drop-zone .drop-zone-thumb").css("background-image", 'url("../../images/admin/manage-members/default-profile.jpg")');
  $(".drop-zone .drop-zone-thumb").attr("data-label", "default-profile.jpg");
  $(".drop-zone-thumb i").css("display", "none");
  $(".drop-zone-prompt .browse input")[0].value = "";
});
