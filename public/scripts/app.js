$(function () {

  // shows a list of previous tweets
  function renderTweets(tweets) {
    tweets.forEach(function(entry) {
    let cookedBird = createTweetElement(entry);
    $("#tweet-container").append(cookedBird);
    });
  }

  // generate all the elements for a new tweet and populate them with data from "textarea"
  function createTweetElement (data) {
    // convert time from milliseconds into days
    const timeStamp = (() => {
      let timeCreated = data.created_at;
      let dateDiff = Date.now() - timeCreated;
        if (dateDiff < 8.64e+7) {
          return "Today";
      } else if (dateDiff > 8.64e+7 && dateDiff < (8.64e+7 * 2)) {
          return "Yesterday";
      } else {return Math.floor(dateDiff/8.64e+7) + " Days ago"; }
    });

    let $tweetSection = $("<section class='tweet'>");
    let $tweetHeader = $("<header class='tweet'>");
    let $tweetUser = $("<h2 class='tweet'>").text(data.user.name);
    let $tweetHandle = $("<p class='tweet'>").text(data.user.handle);
    let $tweetImg = $("<img src=" + data.user.avatars.small + " class='tweet'>");
    let $tweetContent = $("<h3 class='tweet'>").text(data.content.text);
    let $tweetFooter = $("<footer class='tweet'>");
    let $loveIcon = $("<i class='fas fa-heart'></i>");
    let $flagIcon = $("<i class='fas fa-flag'></i>");
    let $retweetIcon = $("<i class='fas fa-retweet'></i>");
    let $tweetDate = $("<h4 class='tweet'>").text(timeStamp());
    let $footer = $tweetFooter.append($flagIcon).append($retweetIcon).append($loveIcon).append($tweetDate);
    let $header = $tweetHeader.append($tweetImg).append($tweetUser).append($tweetHandle);
    let $fullTweet = $tweetSection.append($header).append($tweetContent).append($footer);

    return $fullTweet;
  }
  // populate db with new tweets, giving relevent errors
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

  // grab tweets from db and populate the homepage
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

  // slide new tweet box from under tweets
  $(".compose-button h4").click(function() {
    $(".new-tweet").slideToggle();
  });

  $(".compose-button h4").click(function() {
    $(".new-tweet textarea").focus();
  });

});