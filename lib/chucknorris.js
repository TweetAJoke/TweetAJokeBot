var request = require('request'),
    config = require('config');

module.exports = function(mentorName, callback) {
    if (!mentorName) {
        mentorName = config.chucknorris.mentors[Math.floor(Math.random()*config.chucknorris.mentors.length)];
    }
    request.get('http://api.icndb.com/jokes/random?lastName=&firstName=' + mentorName, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            return callback(body);
        }
    });
};
