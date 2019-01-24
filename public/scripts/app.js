$(function () {


  function renderTweets(tweets) {
      tweets.forEach(function(entry) {
      let cookedBird = createTweetElement(entry);
      $("#tweet-container").append(cookedBird);
    });
  }

  function createTweetElement (data) {
    let $tweetSection = $("<section class='tweet'>");
    let $tweetHeader = $("<header class='tweet'>");
    let $tweetUser = $("<h2 class='tweet'>").text(data.user.name);
    let $tweetHandle = $("<p class='tweet'>").text(data.user.handle);
    let $tweetImg = $("<img src=" + data.user.avatars.small + " class='tweet'>");
    let $tweetContent = $("<h3 class='tweet'>").text(data.content.text);
    let $tweetFooter = $("<footer class='tweet'>");
    let $tweetDate = $("<h4 class='tweet'>").text(data.created_at);
    let $footer = $tweetFooter.append($tweetDate);
    let $header = $tweetHeader.append($tweetImg).append($tweetUser).append($tweetHandle);
    let $fullTweet = $tweetSection.append($header).append($tweetContent).append($footer);
    return $fullTweet;
  }

  $("#postTweets").on('submit', function(event) {
    event.preventDefault();
    $("#error-alert").slideUp();
    if ($("textarea").val().length > 140) {
      $("#error-alert").text("Too many Characters");
      $("#error-alert").slideDown();
    } else if ($("textarea").val().length === 0  ) {
      $("#error-alert").text("Please enter Tweet");
      $("#error-alert").slideDown();
    } else {
        $("#error-alert").text("");
        const serialized = $(this).serialize();
        $.ajax({
          method: "POST",
          url: "/tweets",
          data: serialized,
          success: function() {
            getOrderedTweets();
          }
        });
        $("textarea").val("");
        $("span.counter").text("140");
    }
  });

  const allTweets = $("#tweet-container");

  function getOrderedTweets() {
    $.ajax({
    method: "GET",
    url: "/tweets"
    }).done(function (tweets) {
      allTweets.empty();
      tweets.forEach((tweet) => {
        const element = createTweetElement(tweet);
        allTweets.prepend(element);
      });
    });
  }
  getOrderedTweets();

  $("#composeButton").click(function() {
    $(".new-tweet").slideToggle();
  });

  $("#composeButton").click(function() {
    $(".new-tweet textarea").focus();
  });

});

