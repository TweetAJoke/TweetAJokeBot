var Twit = require('twit'),
    config = require('config'),
    async = require('async');

var twitter = require('./lib/twitter'),
    kitten = require('./lib/kitten'),
    chucknorris = require('./lib/chucknorris');

var T = new Twit(config.twitter),
    twitter = new twitter({
      consumer_key: config.twitter.consumer_key,
      consumer_secret: config.twitter.consumer_secret,
      token: config.twitter.access_token,
      token_secret: config.twitter.access_token_secret
    });

var stream = T.stream('statuses/filter', { track: '#swlille' });

stream.on('tweet', function (tweet) {
  // Skip RTs & our account
  if (tweet.retweeted_status || config.bot.account === tweet.user.screen_name) {
    return true;
  }

  if(tweet.user.default_profile_image) {
    var tweet_content = '@' + tweet.user.screen_name + ' Coucou tête d\'oeuf !!! #swLille';
    twitter.post(tweet_content, null, tweet.id_str, function (error, response, body) {
      if (error) {
        console.error(error);
      }
      else {
        console.log(tweet_content);
      }
    });
  }

  var tweet_content;
  async.waterfall([
    function (callback) {
      if (Math.round(Math.random() * 10) % 2) {
        chucknorris(callback);
      }
      else {
        kitten(callback);
      }
    },
    function (content, image, callback) {
      tweet_content = '@' + tweet.user.screen_name + ' ' + content + ' #5WLille';
      twitter.post(tweet_content, image, tweet.id_str, callback);
    }
  ], function (error, response, body) {
    if (error) {
      console.error(error);
    }
    else {
      console.log(tweet_content);
    }
  });
});
