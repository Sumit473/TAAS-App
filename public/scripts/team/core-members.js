//jshint esversion:6

const t1 = new TimelineMax({
  onUpdate: updatePercentage
});

const controller = new ScrollMagic.Controller();

t1.fromTo($("#members-gallery"), 1, {
  "margin-top": "-130px"
}, {
  "margin-top": "-400px"
});

const scene1 = new ScrollMagic.Scene({
  triggerElement: $("#title"),
  triggerHook: "onLeave",
  duration: "100%",
}).setPin($("#title")).setTween(t1).addTo(controller);

function updatePercentage() {
  t1.progress();
}


function createOpenedMember(imgSrc, memberDetailsElement) {
  const element = '<div class="opened-member" id="member"><i class="fas fa-times"></i><div class="row"><div class="col-sm-6"></span><img class="member-lg-img overlay-bright-img default-transition" src=' + imgSrc + ' alt="member_img"></div><div class="member-details col-sm-6">' + memberDetailsElement + '</div></div></div>';
  return element;
}

let previousIndex = null;
let openPosition = null;
let previousOpenPosition = null;
let previousElement = null;

function openMember(member) {
  $(member).attr("href", "#member");

  let imgHeight = null;
  if (window.matchMedia("(min-width: 768px)").matches) {
    $(".member-details").css("margin", "auto");
    $(".opened-member .row div:nth-child(1) img").before('<span class="center-helper"></span>');
    imgHeight = $(".opened-member .row div:nth-child(1)").css("height");
  } else {
    $(".member-details").css("margin", "0");
    imgHeight = $(".opened-member .row div:nth-child(2)").css("height");
  }
  $(".opened-member").animate({height: imgHeight}, 800);

  $(".opened-member img").css({
    "animation": "open-member 0.8s forwards",
  });
}

function replaceMember(member) {
  $(member).attr("href", "#member");

  let imgHeight = null;
  if (window.matchMedia("(min-width: 768px)").matches) {
    $(".member-details").css("margin", "auto");
    $(".opened-member .row div:nth-child(1) img").before('<span class="center-helper"></span>');
    imgHeight = $(".opened-member .row div:nth-child(1)").css("height");
  } else {
    $(".member-details").css("margin", "0");
    imgHeight = $(".opened-member .row div:nth-child(2)").css("height");
  }
  $(".opened-member").animate({height: imgHeight}, 0);

  $(".opened-member img").css({
    "animation": "open-member 0s forwards",
  });
}

function closeMember(member) {
  $(member).removeAttr("href");
  $(".opened-member").animate({height: 0}, 800);

  $(".opened-member img").css({
    "animation": "close-member 0.6s forwards",
  });

  previousIndex = null;
  previousOpenPosition = null;
  previousElement = null;
}

function getOpenPosition(element) {
  if (window.matchMedia("(min-width: 992px)").matches) {
    return Math.ceil(($(element).parent().index() + 1) / 4) * 4 - 1;
  } else if (window.matchMedia("(min-width: 768px)").matches) {
    return Math.ceil(($(element).parent().index() + 1) / 3) * 3 - 1;
  } else if(window.matchMedia("(min-width: 576px)").matches) {
    return Math.ceil(($(element).parent().index() + 1) / 2) * 2 - 1;
  } else {
    return $(element).parent().index();
  }
}

$(".member-list li a").on("click", function() {
  if (previousElement !== null) {
    $(previousElement).children(":eq(1)").removeClass();
    $(previousElement).children(":eq(1)").addClass("overlay-dim-img");
    $(previousElement).children(".caret-up").css("display", "none");
  }

  if ($(this).parent().index() !== previousIndex) {
    $(this).children(":eq(1)").removeClass();
    $(this).children(":eq(1)").addClass("bright-img");
    $(this).children(".caret-up").css("display", "block");

    $(".opened-member").remove();

    openPosition = getOpenPosition(this);

    const imgSrc = $(this).children(":eq(1)").attr("src");
    const memberDetailsElement = $(this).parent().children(":last-child").html();
    const element = createOpenedMember(imgSrc, memberDetailsElement);

    $(".member-list").children(":eq(" + openPosition + ")").after(element);

    if (previousOpenPosition !== openPosition) {
      openMember(this);
    }
    else {
      replaceMember(this);
    }

    previousIndex = $(this).parent().index();
    previousOpenPosition = openPosition;
    previousElement = this;
  } else {
    closeMember(this);
  }
});

$(window).resize(function() {
  $(previousElement).children(":eq(1)").removeClass();
  $(previousElement).children(":eq(1)").addClass("overlay-dim-img");
  $(previousElement).children(".caret-up").css("display", "none");

  $(".opened-member").animate({height: 0}, 500);
  previousIndex = null;
  previousOpenPosition = null;
  previousElement = null;
});

// let totalMembers = $(".member-list li img").length;
// let nums = [];
// for (let i = 0; i < totalMembers; i++) {
//   nums.push(i);
// }
//
// let ranMembers = [],
//   m = totalMembers,
//   n = 0;
//
// console.log(totalMembers);
//
// while (m--) {
//     n = Math.floor(Math.random() * (m + 1));
//     ranMembers.push(nums[n]);
//     nums.splice(n, 1);
// }
//
// for (let i = 0; i <= Math.floor(totalMembers / 2); i++) {
//   $(".member-list li img:eq(" + ranMembers[i] + ")").attr("data-aos", "zoom-in");
// }
//
// for (let i = totalMembers - 1; i >= Math.ceil(totalMembers / 2); i--) {
//   $(".member-list li img:eq(" + ranMembers[i] + ")").attr("data-aos", "flip-up");
// }
