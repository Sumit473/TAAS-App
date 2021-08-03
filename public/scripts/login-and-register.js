// jshint esversion:6

let isCheck = false;

$(".checkbox").on("click", function() {
  if (isCheck == false) {
    $(this).css("background-color", "rgba(187, 25, 129, 1)");
    $(this).addClass("fas fa-check");
    isCheck = true;
  } else {
    $(this).css("background-color", "rgba(187, 25, 129, 0.3)");
    $(this).removeClass("fas fa-check");
    isCheck = false;
  }
});

// Passoword Iputs
$(".form-group .eye").on("click", function() {
  const type = $(this).parent().children(":eq(1)").attr("type");

  if (type === "text") {
    $(this).parent().children(":eq(1)").attr("type", "password");
    $(this).parent().children(":eq(3)").css("display", "block");
    $(this).parent().children(":eq(2)").css("display", "none");
  } else {
    $(this).parent().children(":eq(1)").attr("type", "text");
    $(this).parent().children(":eq(2)").css("display", "block");
    $(this).parent().children(":eq(3)").css("display", "none");
  }
});
