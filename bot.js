require('newrelic');
var express     = require('express');
var app         = express();
var http        = require('http').Server(app);
var io          = require('socket.io')(http);
var request     = require('request').defaults({ encoding: null });
var bodyParser  = require('body-parser');
var path        = require('path');

var dotenv      = require('dotenv');
dotenv.load();

// Application configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));


/////////////////////////
// Routes definitions //
////////////////////////

// Homepage
app.get('/', function(req, res) {
  res.render('index');
})

// Fire up the web server
var port = Number(process.env.PORT || 3000);
var server = http.listen(port, function() {
  console.log("TweetAJoke started and listening on port " + port);
});

/////////////////////////
// Twitt Bot           //
////////////////////////

var Twit = require('twit'),
    config = require('config'),
    async = require('async');

var twitter = require('./lib/twitter'),
    kitten = require('./lib/kitten'),
    thecat = require('./lib/thecat'),
    chucknorris = require('./lib/chucknorris');

var T = new Twit(config.get("Twitter")),
    twitter = new twitter({
      consumer_key: config.get("Twitter.consumer_key"),
      consumer_secret: config.get("Twitter.consumer_secret"),
      token: config.get("Twitter.access_token"),
      token_secret: config.get("Twitter.access_token_secret")
    });

var stream = T.stream('statuses/filter', { track: '#swlille' });

stream.on('tweet', function (tweet) {
  // Skip RTs & our account
  if (tweet.retweeted_status || config.bot.account === tweet.user.screen_name) {
    return true;
  }

  // Easter egg
  if (tweet.user.default_profile_image) {
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

  // Mentions
  var users = [];
  for (var i = 0; i < tweet.entities.user_mentions.length; i++) {
    users.push(tweet.entities.user_mentions[i].screen_name);
  }

  var tweet_content;
  async.waterfall([
    function (callback) {
      if (Math.round(Math.random() * 10) % 2) {
          if(tweet.text.toLowerCase().indexOf('#kitten') >= 0 ||
              tweet.text.toLowerCase().indexOf('#chaton') >= 0) {
              kitten(users, callback);
          } else if(tweet.text.toLowerCase().indexOf('#thecat') >= 0 ||
              tweet.text.toLowerCase().indexOf('#cat') >= 0||
              tweet.text.toLowerCase().indexOf('#chatoune') >= 0) {
              thecat(users, callback);
          }
      }
      else {
        chucknorris(callback);
      }
    },
    function (content, image, callback) {
      tweet_content = '@' + tweet.user.screen_name + ' ' + content + ' #5WLille';
      twitter.post(tweet_content, image, tweet.id_str, callback);
      io.emit('tweet', {
        image: image,
        message: tweet_content
      });
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
