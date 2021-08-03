// jshint esversion:6

// Circular Progress Indicator
$(window).on("scroll", function() {
  let scrolledFactor = $(this).scrollTop() / ($(document).height() - document.documentElement.clientHeight);
  let offset = 157 - (157 * scrolledFactor);

  if ($(this).scrollTop() <= $("#title h3").position().top) {
    $(".progress-indicator").css("display", "none");
  } else {
    $(".progress-indicator").css("display", "block");
    $("svg circle:last").css("stroke-dashoffset", offset);
  }
});

$(".progress-indicator i").on("click", function() {
  $(window).scrollTop(0);
});
