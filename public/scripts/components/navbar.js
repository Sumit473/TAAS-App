//jshint esversion:6
let lastScrollTop1 = 0;

// Navbar
$(window).on("scroll", function() {
  let positionTop = $(this).scrollTop();

  if (positionTop > $("#title h3").position().top + 50) {
    $(".my-nav").css({
      "animation": "unskew 0.5s 1 forwards",
      "transform": "skew(0)"
    });
    $(".taas-brand").css("transform", "skew(0)");
    $(".tilted-box").css("transform", "skew(-30deg)");
    $(".tilted-line").css("transform", "skew(-30deg)");
    $(".my-nav ul").css("transform", "skew(0)");
    $(".social-link").css("transform", "skew(-30deg)");
    $(".social-link i").css("transform", "skew(30deg)");
    $(".search").css("transform", "skew(0)");
    $(".hamburger").css("transform", "skew(0)");
  } else {
    $(".my-nav").css({
      "animation": "skew 0.5s 1 forwards",
      "transform": "skew(-30deg)"
    });
    $(".taas-brand").css("transform", "skew(30deg)");
    $(".tilted-box").css("transform", "skew(0deg)");
    $(".tilted-line").css("transform", "skew(0deg)");
    $(".my-nav ul").css("transform", "skew(30deg)");
    $(".social-link").css("transform", "skew(0)");
    $(".social-link i").css("transform", "skew(30deg)");
    $(".search").css("transform", "skew(30deg)");
    $(".hamburger").css("transform", "skew(30deg)");
  }

  if (lastScrollTop1 > positionTop && positionTop <= $("#title h3").position().top + 50) {
    $(".my-nav").css("animation", "skew 0.5s 1 ");
  }
});

$(".navbar-link").hover(function() {
  $(this).children(":first-child").css("display", "inline");
  $(".my-nav ul").css("animation", "smooth-slideIn 0.5s linear 1 forwards");
  $(this).children(":first-child").css("animation", "inc-opacity 0.5s linear 1 forwards");
}, function() {
  $(this).children(":first-child").css("display", "none");
  $(".my-nav ul").css("animation", "smooth-slideOut 0.5s 1 forwards");
});


function responsiveUL(maxWidth, item, itemNo) {
  if ($(window).width() < maxWidth) {
    if (maxWidth === 1515) {
      $(".more-item").css("display", "list-item");
    }
    $(item).css("display", "none");
    $(".more-dropdown").children().eq(itemNo).css("display", "list-item");
  } else {
    if (maxWidth === 1515) {
      $(".more-item").css("display", "none");
    }
    $(item).css("display", "list-item");
    $(".more-dropdown").children().eq(itemNo).css("display", "none");
  }
}

function responsiveNavbar() {
  if ($(window).width() < 1122) {
    $(".my-nav ul").css("display", "none");
    $(".my-nav").css("justify-content", "space-between");
    $(".social-links").css("right", "120px");
    $(".search").css("right", "74px");
    $(".hamburger").css("display", "block");
  } else {
    $(".my-nav ul").css("display", "flex");
    $(".my-nav").css("justify-content", "flex-start");
    $(".social-links").css("right", "70px");
    $(".search").css("right", "24px");
    $(".hamburger").css("display", "none");
  }

  if ($(window).width() < 983) {
    $(".taas-brand span").text("TAAS");
    $(".tilted-box").css("display", "none");
    $(".tilted-line").css("display", "none");
  } else {
    $(".taas-brand span").text("Thapar Amateur Astronomers Society");
    $(".tilted-box").css("display", "block");
    $(".tilted-line").css("display", "block");
  }

  if ($(window).width() < 555) {
    $(".social-links").css("display", "none");
  } else {
    $(".social-links").css("display", "flex");
  }

  if ($(window).width() < 407) {
    $(".search").css("display", "none");
  } else {
    $(".search").css("display", "block");
  }
}

responsiveUL(1515, ".contact-item", 4);
responsiveUL(1470, ".team-item", 3);
responsiveUL(1380, ".blog-item", 2);
responsiveUL(1315, ".gallery-item", 1);
responsiveUL(1216, ".events-item", 0);
responsiveNavbar();

$(window).on("resize", function() {
  responsiveUL(1515, ".contact-item", 5);
  responsiveUL(1470, ".team-item", 3);
  responsiveUL(1380, ".blog-item", 2);
  responsiveUL(1315, ".gallery-item", 1);
  responsiveUL(1216, ".events-item", 0);
  responsiveNavbar();
});



// Popover
$('[data-toggle="popover"]').popover();
