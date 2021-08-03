// jshint esversion:6

// Planets Scroll Animation
function animatePlanets() {
  const satellite = $(".satellite");
  const moon = $(".moon");
  const astronaut = $(".astronaut");
  const rocket = $(".rocket");
  const halfMoon = $(".half-moon");
  const mediumMoon = $(".medium-moon");

  const t1 = new TimelineMax({
    onUpdate: updatePercentage
  });

  const controller = new ScrollMagic.Controller();

  t1.to(satellite, 2, {
    x: -700,
    y: -600,
    width: "40%",
  }).to(halfMoon, 2, {
    x: 700,
    y: 750,
    width: "0",
    opacity: 0.5,
  }, "-=2").to(rocket, 2, {
    x: 900,
    y: -400,
    width: "25%",
  }, "-=2").to(moon, 2, {
    y: -1500,
    width: "100%",
  }, "-=2");

  const scene1 = new ScrollMagic.Scene({
    triggerElement: "#planets-animate",
    triggerHook: "onLeave",
    duration: "100%",
  }).setPin("#planets-animate").setTween(t1).addTo(controller);

  function updatePercentage() {
    t1.progress();
  }
}

if (window.matchMedia("(min-width: 769px)").matches) {
  animatePlanets();
}

// $(window).resize(function() {
//   if (window.matchMedia("(min-width: 769px)").matches) {
//     animatePlanets();
//   }
// });



// Heading Animation
function spanHeading(element) {
  const content = $(element).text();
  const splitContent = content.split("");
  $(element).text("");

  for (let i = 0; i < splitContent.length; i++) {
    if (splitContent[i] === " ") {
      $(element).append("<span>" + splitContent[i] + "</span>");
      $(element + " span:eq(" + i + ")").css("margin-left", "10px");
    } else {
      $(element).append("<span>" + splitContent[i] + "</span>");
    }
  }

  return splitContent;
}

function headingAnimation(element, section, count, splitContent) {
  $(window).on("scroll", function() {
    if ($(this).scrollTop() >= $(section).position().top - 450) {
      typing(count, element, splitContent);
    } else {
      $(element + " span").removeClass("heading-animate");
    }
  });
}

function typing(count, element, splitContent) {
  function main() {
    if (count < splitContent.length) {
      $(element + " span:eq(" + count + ")").addClass("heading-animate");
      count++;
      setTimeout(main, 30);
    }
  }
  main();
}



// Gradient Text

if (window.matchMedia("(max-width: 600px)").matches) {
  $(".section-heading").addClass("gradient-text");
}

// $(window).resize(function() {
//   if (window.matchMedia("(max-width: 600px)").matches) {
//     $(".section-heading").addClass("gradient-text");
//   }
// });



// Vision
if (window.matchMedia("(min-width: 769px)").matches) {
  const visionSplit = spanHeading(".vision-heading h2");
  headingAnimation(".vision-heading h2", "#vision", 0, visionSplit);
}

function visionChanges() {
  if (window.matchMedia("(max-width: 992px)").matches) {

    $("#vision .row").children(":last-child").addClass("bg-logo bg-image");
    $("#vision .row").children(":first-child").removeClass("bg-logo bg-image");
  } else {
    $("#vision .row").children(":first-child").addClass("bg-logo bg-image");
    $("#vision .row").children(":last-child").removeClass("bg-logo bg-image");
  }

  if (window.matchMedia("(max-width: 600px)").matches) {
    $("#vision .row").children(":last-child").removeClass("bg-logo bg-image");
  }
}

visionChanges();

// function readMoreVision() {
//   let dots = $(".vision-dots");
//   let moreText = $(".more-vision");
//   let btn = $("#vision button");
//
//   if (dots.css("display") === "none") {
//     dots.css("display", "inline");
//     btn.text("Read More");
//     moreText.css("display", "none");
//   } else {
//     dots.css("display", "none");
//     btn.text("Read Less");
//     moreText.css("display", "inline");
//   }
// }

// $(window).resize(function() {
//   if (window.matchMedia("(min-width: 769px)").matches) {
//     const visionSplit = spanHeading(".vision-heading h2");
//     headingAnimation(".vision-heading h2", "#vision", 0, visionSplit);
//   }
//   visionChanges();
// });



//Extraordinary
if (window.matchMedia("(min-width: 769px)").matches) {
  const extraordinarySplit = spanHeading(".extraordinary-heading h2");
  headingAnimation(".extraordinary-heading h2", "#extraordinary", 0, extraordinarySplit);
}

$(".extraordinary-img, .extraordinary-img-heading h3, .extraordinary-img-heading i").on("click", function() {
  $(".extraordinary-img-heading a").attr("href", "#extraordinary-content");
  if ($("#extraordinary-content").css("height") === "0px") {
    $("#extraordinary-content").css({
      "animation": "unfold-extraordinary 0.8s 1 forwards",
      "overflow-y": "scroll"
    });
    setTimeout(function() {
      $(".extraordinary-img").css("filter", "brightness(1) hue-rotate(325deg) drop-shadow(-1px 2px 10px black)");
      $(".caret-up").css("display", "block");
    }, 1000);
  }
  if ($("#extraordinary-content").css("height") === "700px") {
    $(".extraordinary-img-heading a").removeAttr("href");
    $("#extraordinary-content").css({
      "animation": "fold-extraordinary 0.5s 1 forwards",
      "overflow-y": "hidden"
    });
    setTimeout(function() {
      $(".extraordinary-img").css("filter", "brightness(0.5) hue-rotate(325deg) drop-shadow(-1px 2px 10px black)");
      $(".caret-up").css("display", "none");
    }, 1000);
  }
});

let extraordinaryCount = 0;
const planet = $(".planet");
const t2 = new TimelineMax();

$(window).on("scroll", function() {
  let positionTop = $(this).scrollTop();

  if (positionTop >= $("#extraordinary").position().top - 400 && extraordinaryCount === 0) {
    t2.to(planet, 1, {
        filter: "blur(2px)",
        left: "10%",
        top: "10%",
        width: "40%"
      })
      .to(planet, 0, {
        filter: "blur(0)"
      })
      .to(planet, 1.2, {
        width: "15%",
        ease: "elastic.out(0.5, 0.4)"
      })
      .to(planet, 0.5, {
        transform: "rotate(-20deg)"
      })
      .to(planet, 1, {
        filter: "blur(4px)",
        top: "-120%",
        transform: "rotate(-150deg)"
      });

    setTimeout(function() {
      $(".planet").css("display", "none");
    }, 10000);

    extraordinaryCount++;
  }
});

// $(window).resize(function() {
//   if (window.matchMedia("(min-width: 769px)").matches) {
//     const extraordinarySplit = spanHeading(".extraordinary-heading h2");
//     headingAnimation(".extraordinary-heading h2", "#extraordinary", 0, extraordinarySplit);
//   }
// });



//Events
if (window.matchMedia("(min-width: 769px)").matches) {
  const eventsSplit = spanHeading(".events-heading h2");
  headingAnimation(".events-heading h2", "#events", 0, eventsSplit);

  $(".events-column .card-body").hover(function() {
    $(this).parent().css("transform", "translateY(-60px)");
    $(this).parent().children(":eq(0)").children(":eq(0)").addClass("border-dim-img");
  }, function() {
    $(this).parent().css("transform", "translateY(0)");
    $(this).parent().children(":eq(0)").children(":eq(0)").removeClass("border-dim-img");
  });

  $(".events-column button").hover(function() {
    $(this).parent().children(":eq(0)").children(":eq(1)").children(":eq(1)").css("-webkit-text-fill-color", "#BB1981");
  }, function() {
    $(this).parent().children(":eq(0)").children(":eq(1)").children(":eq(1)").css("-webkit-text-fill-color", "transparent");
  });
}

const spaceship = $(".spaceship");
$(window).scroll(function() {
  let positionTop = $(this).scrollTop();

  if (positionTop >= $("#events").position().top - 200) {
    spaceship.css("animation", "half-circle 2.5s linear 1");
    setTimeout(function() {
      $(spaceship).css("display", "none");
    }, 5000);
  }
});

// $(window).resize(function() {
//   if (window.matchMedia("(min-width: 769px)").matches) {
//     const eventsSplit = spanHeading(".events-heading h2");
//     headingAnimation(".events-heading h2", "#events", 0, eventsSplit);
//
//     $(".events-column .card-body").hover(function() {
//       $(this).parent().css("transform", "translateY(-80px)");
//       $(this).parent().children(":eq(0)").children(":eq(0)").addClass("border-dim-img");
//     }, function() {
//       $(this).parent().css("transform", "translateY(0)");
//       $(this).parent().children(":eq(0)").children(":eq(0)").removeClass("border-dim-img");
//     });
//
//     $(".events-column button").hover(function() {
//       $(this).parent().children(":eq(0)").children(":eq(1)").children(":eq(1)").css("-webkit-text-fill-color", "#BB1981");
//     }, function() {
//       $(this).parent().children(":eq(0)").children(":eq(1)").children(":eq(1)").css("-webkit-text-fill-color", "transparent");
//     });
//   }
// });



//Blog
if (window.matchMedia("(min-width: 769px)").matches) {
  const blogSplit = spanHeading(".blog-heading h2");
  headingAnimation(".blog-heading h2", "#blog", 0, blogSplit);
}

function responsiveBlogCarousel() {
  if ($(window).width() < 1428) {
    $(".blog-content h3").css("display", "none");
  } else {
    $(".blog-content h3").css("display", "inline");
  }

  if ($(window).width() < 1380) {
    $(".carousel-item img").css("display", "none");
    $(".blog-carousel").css({
      "background-image": 'url("../images/home/blog/blog-img' + ($(".carousel-item.active").index() + 1) + '.jpg")',
      "background-repeat": "no-repeat",
      "background-size": "cover",
      "background-position": "center"
    });
    $(".carousel-control-prev").on("click", function() {
      let index = $(".carousel-item.active").index();
      if (index === 0) {
        $(".blog-carousel").css(
          "background-image", 'url("../images/home/blog/blog-img3.jpg")');
      } else {
        $(".blog-carousel").css(
          "background-image", 'url("../images/home/blog/blog-img' + index + '.jpg")');
      }
    });
    $(".carousel-control-next").on("click", function() {
      let index = $(".carousel-item.active").index();
      if (index === 2) {
        $(".blog-carousel").css(
          "background-image", 'url("../images/home/blog/blog-img1.jpg")');
      } else {
        $(".blog-carousel").css(
          "background-image", 'url("../images/home/blog/blog-img' + (index + 2) + '.jpg")');
      }
    });
    $(".blog-content").css("margin", "8% 10%");
    $(".blog-content h3").css("display", "inline");
    $(".carousel-indicators").css("display", "none");
  } else {
    $(".carousel-item img").css("display", "inline-block");
    $(".blog-carousel").css({
      "background-image": 'url("../images/home/blog/blog-bg.png")',
      "background-repeat": "repeat",
      "background-size": "auto",
      "background-position": "0% 0%"
    });
    $(".blog-content").css("margin", "2% 9% 2% 0");
    $(".carousel-indicators").css("display", "flex");
    $(".carousel-control-prev").on("click", function() {
      $(".blog-carousel").css(
        "background-image", 'url("../images/home/blog/blog-bg.png")');
    });
    $(".carousel-control-next").on("click", function() {
      $(".blog-carousel").css(
        "background-image", 'url("../images/home/blog/blog-bg.png")');
    });
  }
}

responsiveBlogCarousel();
// $(window).resize(function() {
//   if (window.matchMedia("(min-width: 769px)").matches) {
//     const blogSplit = spanHeading(".blog-heading h2");
//     headingAnimation(".blog-heading h2", "#blog", 0, blogSplit);
//   }
//   responsiveBlogCarousel();
// });



//Solar system
$(window).on("scroll", function() {
  if ($(window).scrollTop() >= $(".solar-system").position().top - 480) {
    $(".solar-system").css("animation", "opacity 3s 1 forwards");
  }

  if ($(window).scrollTop() >= $(".solar-system").position().top - 300) {
    $(".comet").css("animation", "comet-animate 1.5s 1 forwards");
  }
});

//Get In Touch Form
if (window.matchMedia("(min-width: 769px)").matches) {
  const inTouchSplit = spanHeading(".in-touch-heading h2");
  headingAnimation(".in-touch-heading h2", "#get-in-touch", 0, inTouchSplit);
}

$(window).on("scroll", function() {
  if ($(this).scrollTop() >= $("#get-in-touch").position().top - 410) {
    $(".in-touch-bg").css("animation", "increase-bg 1.5s 1 forwards");
  }
});

$(".in-touch-form")[0].reset(); // Reseting the form
$("#formMessage").val("");

$(".in-touch-form").children(":eq(1)").children(".focus-line, .unfocus-line").css("width", "53.5%");


formValidation(".in-touch-form #formYourName", validateName);
formValidation(".in-touch-form #formPhone", validatePhoneNumber);

// Submission or not
function controllSubmission(e) {
  if (isValidName && isValidEmail && isValidPhone) {
    e.defaultPrevented = false;
  }
  else {
    e.preventDefault();
  }
}

if (window.matchMedia("(max-width: 768px)").matches) {
  $(".in-touch-form button").removeClass("absolute-horizontal-center");
}

$(window).resize(function() {
  // if (window.matchMedia("(min-width: 769px)").matches) {
  //   const inTouchSplit = spanHeading(".in-touch-heading h2");
  //   headingAnimation(".in-touch-heading h2", "#get-in-touch", 0, inTouchSplit);
  // }

  if (window.matchMedia("(max-width: 768px)").matches) {
    $(".in-touch-form button").removeClass("absolute-horizontal-center");
  } else {
    $(".in-touch-form button").addClass("absolute-horizontal-center");
  }
});
