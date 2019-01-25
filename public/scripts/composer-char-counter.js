$(function () {
  $("textarea").on("input", function() {
    let counter = 140 - $(this).val().length;
    $(this).siblings(".counter").text(counter);
    let counterNum = $(this).siblings(".counter");
    if (counter < 0) {
     $(this).siblings(".counter").css("color", "red");
    } else {$(this).siblings(".counter").css("color", "black"); }
  });
});