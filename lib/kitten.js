var request = require('request'),
    config = require('config');

module.exports = function (users, callback) {
  request.get(
    'http://api.giphy.com/v1/gifs/random?tag=kitten&api_key=' + config.giphy.api_key,
    function (error, response, body) {
      if (error || response.statusCode !== 200) {
        return callback(error || response.statusCode);
      }

      var message = config.kitten.messages[
        Math.floor(Math.random() * config.kitten.messages.length)
      ];

      for (var i = 0; i < users.length; i++) {
        message += ' @' + users[i];
      }

      return callback(null, message, JSON.parse(body).data.image_url);
    }
  );
};
