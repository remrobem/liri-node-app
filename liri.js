const dotenv = require('dotenv').config();
const twitter = require('twitter');
const spotify = require('node-spotify-api');
const request = require('request');
const keys = require('./keys.js');

// Spotify variables
let spotifyKeys = new spotify(keys.spotify);


// Twitter variables
let client = new twitter(keys.twitter);
let user = 'mysta2u';
let tweetCount = 20;
let twitterParams = {
    screen_name: user,
    count: tweetCount
};

// request variables
let command = process.argv[2];
let argument = process.argv[3];

// proces the input request
switch (command) {

    case `my-tweets`:
        tweets();
        break;
    case `spotify-this-song`:
        song();
        break;
    case `movie-this`:
        movie();
        break;
    case `do-what-it-says`:
        random();
        break;
    case `?`:
        help();
        break;
    default:
        badCommand();
}

function tweets() {
    client.get('statuses/user_timeline', twitterParams, function (error, tweets, response) {
        if (!error) {
            console.log(`Last ${tweetCount} tweets for @${user}:`)
            tweets.forEach(tweet => {
                
                console.log(`Tweet: ${tweet.text} | Created: ${tweet.created_at}`);
            });
        } else {
            console.log(`Twitter Error: ${error}`);
        }
    });
};

function song() {

};

function movie() {

};

function random() {

};

function help() {
    console.log(`Valid requests are:`)
    console.log(`  my-tweets`)
    console.log(`  spotify-this-song`)
    console.log(`  movie-this`)
    console.log(`  do-what-it-says`)
};

function badCommand() {
    console.log(`${command} is not a valid request`)
    console.log(`use ? to diplay valid requests`)
};