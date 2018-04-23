const dotenv = require('dotenv').config();
const twitter = require('twitter');
const spotify = require('node-spotify-api');
const request = require('request');
const fs = require('fs');
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

// randon variables
let fileName = 'random.txt';

// request variables
let command = process.argv[2];
let argument = process.argv[3];

// output variables
let logFile = 'log.txt'
let outputData = '';

processCommand();

function processCommand() {
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
    };
};

//Twitter API to search user timeline for tweets. Each tweet is written to console log along with the Twitter create data/time
function tweets() {

    client.get('statuses/user_timeline', twitterParams, function (error, tweets, response) {
        if (!error) {
            console.log(`Last ${tweetCount} tweets for @${user}:`)
            tweets.forEach(tweet => {
                outputData = (`Tweet: ${tweet.text} | Created: ${tweet.created_at}`);
                outputProcess(outputData);
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

    let spotify = new spotify({
        id: ceb5029fb31b4621bc2793887cc86c7c,
        secret: fd98057b83cd43c6ad18a4bdf9a47d8d
    });

    spotify.search({
        type: 'track',
        query: songTitle
    }, function (err, data) {
        if (err) {
            return console.log(`Spotify search error occured for ${songTitle}:${err}`);
        };
        console.log(data);
    });
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

    // function readContent(callback) {
    //     fs.readFile("./Index.html", function (err, content) {
    //         if (err) return callback(err)
    //         callback(null, content)
    //     })
    // }

    // readContent(function (err, content) {
    //     console.log(content)
    // })


    fs.readFile(fileName, 'utf8', function (err, data) {
        if (err) {
            outputData = (`
                            fs error on $ {
                                fileName
                            }: $ {
                                err
                            }
                            `);
            outputProcess(outputData);
        }
        //input file can have multiple lines of requests

        // remove any " that might be in the request data read from the file
        data = data.replace(/"/g, '');

        //create a new array for each line in the request input file
        let requestArr = data.split('\r\n');

        // attempt to process the request command for each entry in the request array
        // the array entry is split at a comma - this is the seperator between command and argument in the request file
        requestArr.forEach(element => {
            let requestItem = element.split(',');
            command = requestItem[0];
            argument = requestItem[1];
            processCommand();
        });
    });
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
};

function help() {
    outputData = (`
                            Valid requests are: `);
    outputProcess(outputData);
    outputData = (`
                            my - tweets `);
    outputProcess(outputData);
    outputData = (`
                            spotify - this - song followed by a song title `);
    outputProcess(outputData);
    outputData = (`
                            movie - this followed by a movie title `);
    outputProcess(outputData);
    outputData = (`
                            do -what - it - says `);
    outputProcess(outputData);
};

function badCommand() {
    outputData = (`
                            $ {
                                command
                            }
                            is not a valid request `);
    outputProcess(outputData);
    outputData = (`
                            use ? to diplay valid requests `);
    outputProcess(outputData);
};

// write all console logs to log.txt
function outputProcess(data) {

    timestamp = new Date().toISOString().slice(-24).replace(/\D/g, '').slice(0, 14);
    console.log(data);
    fs.appendFile(logFile, `
                            $ {
                                timestamp
                            } : $ {
                                data
                            }\
                            n `, function (err) {
        if (err) {
            console.log(`
                            Error appending to $ {
                                logFile
                            }: $ {
                                err
                            }
                            `);
        }
    });

};