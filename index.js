var express     = require('express');
var app         = express();
var request     = require('request').defaults({ encoding: null });
var bodyParser  = require('body-parser');
var path        = require('path');

var dotenv      = require('dotenv');
dotenv.load();

var config      = require('config');

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
var server = app.listen(port, function() {
  console.log("TweetAJoke started and listening on port " + port);
});
