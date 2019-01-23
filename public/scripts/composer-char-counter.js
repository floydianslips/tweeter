$(function () {
  
  $("textarea").on("input", function() {
    let counter = $(this).val().length;
    let num = 140 - counter;

    // console.log(counter)
    $(this).siblings(".counter").text(140 - counter);
    // console.log($(this).siblings(".counter").text())

    })

  });