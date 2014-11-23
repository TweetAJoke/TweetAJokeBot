var assert = require("assert")
var twitter = require("../lib/twitter")
var Twit = require('twit'),
  	config = require('config')

describe('Twitter', function(){
	describe('twitter_update_with_media', function(){
		describe('post', function(){
			it("is defined", function() {
				var tuwm = new twitter();
				expect(tuwm.post()).not.toBeUndefined();
	     	});
		})
	})
})
