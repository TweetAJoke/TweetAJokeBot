var request = require('request'),
    config = require('config');

module.exports = function (callback) {
  request.get(
    'http://api.giphy.com/v1/gifs/random?tag=kitten&api_key=' + config.giphy.api_key,
    function (error, response, body) {
      if (error || response.statusCode !== 200) {
        return callback(error || response.statusCode);
      }

      return callback(
        null,
        config.kitten.messages[
          Math.floor(Math.random() * config.kitten.messages.length)
        ],
        JSON.parse(body).data.image_url
      );
    }
  );
};
