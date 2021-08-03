//jshint esversion:6

// Over-Vision
const t1 = new TimelineMax({
  onUpdate: updatePercentage
});

const controller = new ScrollMagic.Controller();

t1.fromTo($("#our-vision"), 0.4, {
  "margin-top": "-130px"
}, {
  "margin-top": "-450px"
});

const scene1 = new ScrollMagic.Scene({
  triggerElement: $("#title"),
  triggerHook: "onLeave",
  duration: "100%",
}).setPin($("#title")).setTween(t1).addTo(controller);

function updatePercentage() {
  t1.progress();
}

function visionChanges() {
  if (window.matchMedia("(max-width: 992px)").matches) {

    $("#our-vision .row").children(":last-child").addClass("bg-logo bg-image");
    $("#our-vision .row").children(":first-child").removeClass("bg-logo bg-image");
  } else {
    $("#our-vision .row").children(":first-child").addClass("bg-logo bg-image");
    $("#our-vision .row").children(":last-child").removeClass("bg-logo bg-image");
  }

  if (window.matchMedia("(max-width: 600px)").matches) {
    $("#our-vision .row").children(":last-child").removeClass("bg-logo bg-image");
  }
}

visionChanges();

$(window).resize(function() {
  visionChanges();
});
