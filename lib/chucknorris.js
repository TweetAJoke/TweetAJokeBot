(function() {
    var request = require('request');

    module.exports = function(mentorName, callback) {
        request.get('http://api.icndb.com/jokes/random?lastName=&firstName=' + mentorName, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return callback(body);
            }
        });
    };

}).call(this);
