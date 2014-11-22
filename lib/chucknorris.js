var request = require('request'),
    config = require('config');

module.exports = function (mentorName, callback) {
    if (!callback) {
      callback = mentorName;
      mentorName = config.chucknorris.mentors[
        Math.floor(Math.random() * config.chucknorris.mentors.length)
      ];
    }

    request.get(
      'http://api.icndb.com/jokes/random?lastName=&firstName=' + mentorName,
      function (error, response, body) {
        if (error || response.statusCode !== 200) {
          return callback(error || response.statusCode);
        }

        return callback(
          null,
          JSON.parse(body).value.joke + ' #MentorFacts',
          config.chucknorris.pictures[mentorName.substring(1)]
        );
      }
    );
};
