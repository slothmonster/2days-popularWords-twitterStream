var Twit = require('twit');
var dbHelps = require('../db/dbHelpers');
var env = require('../env_config');
var tweetHelp = require('./twitHelps');
var fs = require('fs');


var T = new Twit({
  consumer_key: env.api_key,
  consumer_secret: env.api_secret,
  access_token: env.access_token_key,
  access_token_secret: env.access_token_secret
});
var unitedStates = [-125.02,31.77,-89.99,48.5,-90.04,30.03,-83.4,47.77,-83.89,24.21,-77.24,41.94,-80.29,32.67,-73.64,43.05,-76.51,39.61,-68.9,45.24,-106.04,29.21,-75.75,33.68,-99.8,26.24,-95.44,30.71 ];
var stream = T.stream('statuses/filter', {locations: unitedStates, language: 'en'});
// var stream = T.stream('statuses/sample');

stream.on('tweet', function(tweet){
  tweetHelp.stripAllTheThings(tweet.text, function(stripped){
    tweetHelp.parseText(stripped, function(word){
      dbHelps.updateOrInsert(word);
    });
  });
  // console.log(tweet);
  // console.log(tweet.text);
});

stream.on('disconnect', function(disconnectMessage){
  console.log("disconnecting: " + disconnectMessage);
});

stream.on('warning', function(warning){
  fs.appendFile('./warningLog.txt',"\n" + warning + "\n", {encoding:'utf8'}, function(err){
    console.log("trying to write to warnignLogs threw the following error: " + err);
  });
  console.log(warning);
});

module.exports = stream;