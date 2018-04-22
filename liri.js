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

//Twitter API to search user timeline for tweets. Each tweet is written to console log along with the Twitter create data/time
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
    let songInfo = getSpotify(parameterString());
};

function getSpotify(songTitle) {
   
// spotify API goes here

    let songInfo = {
        'title': 'aa'
    };
    return songInfo;
};

function movie() {
    let movieInfo = getOMDB(parameterString());
};

function getOMDB(movieTitle) {
   
    // OMDB API goes here
    
        let movieInfo = {
            'title': 'aa'
        };
        return movieInfo;
    };

function random() {

};

// convert the paramaters passed after the command into a string
function parameterString() {
    let parameters = process.argv.slice(3, process.argv.length);
    let parameterStr = '';
    parameters.forEach((word) => {
        parameterStr = parameterStr + ' ' + word;
    });
    // remove the 1st character from the string. Not sure why it is getting added.
    parameterStr = parameterStr.substring(1);
    return parameterStr;
}

function help() {
    console.log(`Valid requests are:`)
    console.log(`  my-tweets`)
    console.log(`  spotify-this-song  followed by a song title`)
    console.log(`  movie-this   followed by a movie title`)
    console.log(`  do-what-it-says  `)
};

function badCommand() {
    console.log(`${command} is not a valid request`)
    console.log(`use ? to diplay valid requests`)
};