[![Build Status](https://travis-ci.org/TweetAJoke/TweetAJokeBot.svg?branch=master)](https://travis-ci.org/TweetAJoke/TweetAJokeBot)

## Installation

	npm install

## Local server

	node index.js

## Config

You can access all the variables defined in the config file this way
    
    config.get('Twitter.consumer_key')

Edit the .env file like shown in .env.sample and add the secret settings in it

## Deploy

On RunAbove instance :

	git pull --force 	#YOLO
	pm2 restart all  	#BurnThemAll