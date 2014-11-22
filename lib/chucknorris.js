(function() {
    var request, chucknorris;

    request = require('request');

    chucknorris = (function() {
        function chucknorris() {
            this.api_url = 'http://api.icndb.com/jokes/random?firstName=SWLille&lastName=';
        }

        chucknorris.prototype.get = function(callback) {
            request(this.api_url, callback);
        };

        return chucknorris;

    })();

    module.exports = chucknorris;

}).call(this);
