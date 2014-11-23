var config = require('config');

module.exports = function (users, callback) {
    var message = config.kitten.messages[
        Math.floor(Math.random() * config.kitten.messages.length)
        ];

    for (var i = 0; i < users.length; i++) {
        message += ' @' + users[i];
    }

    return callback(null, message, 'http://thecatapi.com/api/images/get?format=src&size=small');
};
