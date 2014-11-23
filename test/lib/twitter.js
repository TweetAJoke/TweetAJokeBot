var assert = require("assert")
var twitter = require("../../lib/twitter")
var Twit = require('twit'),
  	config = require('config')
  	
var T = new Twit(config.twitter),
    twitter = new twitter({
      consumer_key: config.twitter.consumer_key,
      consumer_secret: config.twitter.consumer_secret,
      token: config.twitter.access_token,
      token_secret: config.twitter.access_token_secret
    });

describe('Twitter', function(){
	describe('twitter_update_with_media', function(){
		describe('post', function(){
			it("is defined", function() {
				expect(twitter.post('', null, '', null)).not.toBeUndefined();
	     	});
		})
	})
})