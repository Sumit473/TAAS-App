// jshint esversion:6

const astronaut = $(".astronaut");
const rocket = $(".rocket");

const t1 = new TimelineMax();

setTimeout(function() {
  $(".astronaut").css({
    "transform": "rotate(30deg)",
    "width": "26%",
    "-webkit-animation": "swing 2.5s infinite alternate",
    "animation": "swing 2.5s infinite alternate"
  });
}, 3500);
