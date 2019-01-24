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
    console.log($("textarea").val().length);
    event.preventDefault();
    if ($("textarea").val().length > 140) {
      alert("Gotcha! You tried to sneak too many letters in");
    } else if ($("textarea").val().length === 0  ) {
        alert("Hard to tweet nada");
    } else {
        const serialized = $(this).serialize();
        $.ajax({
          method: "POST",
          url: "/tweets",
          data: serialized,
          success: function() {
          getOrderedTweets();
          }
        });


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
});

