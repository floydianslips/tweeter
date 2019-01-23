$(function () {

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "fkjllllllllllllessssssssssssssssssssssssssseffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    }, "created_at": 1461116232227 
    },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


function renderTweets(tweets) {
//   console.log($("#tweet-container"))
  tweets.forEach(function(entry) {
    let cookedBird = createTweetElement(entry)
    $("#tweet-container").append(cookedBird);
//     console.log(cookedBird)    
   })
//   console.log(renderTweets(data))
    }

// console.log(renderTweets(tweets))

function createTweetElement (data) {
  let $tweetSection = $("<section class='tweet'>");
  let $tweetHeader = $("<header class='tweet'>");
  let $tweetUser = $("<h2 class='tweet'>").text(data.user.name)
  let $tweetHandle = $("<p class='tweet'>").text(data.user.handle);
  let $tweetImg = $("<img src=" + data.user.avatars.small + " class='tweet'>");
  let $tweetContent = $("<h3 class='tweet'>").text(data.content.text);
  let $tweetFooter = $("<footer class='tweet'>");
  let $tweetDate = $("<h4 class='tweet'>").text(data.created_at);
  
  let $footer = $tweetFooter.append($tweetDate);
  let $header = $tweetHeader.append($tweetImg).append($tweetUser).append($tweetHandle);
  let $fullTweet = $tweetSection.append($header).append($tweetContent).append($footer);
//   let newTweets = $("#tweet-container").append($fullTweet);
//  console.log($("fullTweets"))
  return $fullTweet;
}
 renderTweets(data)
});

