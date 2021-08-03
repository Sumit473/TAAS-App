// jshint esversion:6

// Slider
setInterval(function() {
  $(".intro-slider .carousel-indicators li div").removeClass("outline");
  $(".intro-slider .carousel-indicators li.active div").addClass("outline");
}, 50);

// Submission or not
function controllSubmission(e) {
  if ($(".form-group #formUser").val() && $(".form-group #formPassword").val()) {
    e.defaultPrevented = false;
  }
  else {
    e.preventDefault();
  }
}
