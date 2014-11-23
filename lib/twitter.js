(function() {
  var fs, path, request, entities, twitter_update_with_media;

  fs = require('fs');
  path = require('path');
  request = require('request');
  entities = new (require('html-entities').AllHtmlEntities);


  twitter_update_with_media = (function() {
    function twitter_update_with_media(auth_settings) {
      this.auth_settings = auth_settings;
      this.api_update_media = 'https://api.twitter.com/1.1/statuses/update_with_media.json';
      this.api_update = 'https://api.twitter.com/1.1/statuses/update.json';
    }

    twitter_update_with_media.prototype.post = function (status, image_url, reply_id, callback) {
      var form, r;
      r = request.post(
        image_url ? this.api_update_media : this.api_update,
        { oauth: this.auth_settings },
        callback
      );
      form = r.form();
      form.append('status', entities.decode(status));

      if (image_url) {
        form.append('media[]', request(image_url));
      }

      form.append('in_reply_to_status_id', reply_id);
    };

    return twitter_update_with_media;

  })();

  module.exports = twitter_update_with_media;

}).call(this);
