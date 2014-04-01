var app = require('./server-config.js');
var Twit = require('twit');
var env = require('./env_config.js');
var fs = require('fs');
var util = require('./lib/utility');
var dbHelps = require('./db/dbHelpers');

var port = process.env.PORT || 4568;

app.listen(port);


console.log('Server now listening on port ' + port);

// dbHelps.updateOrInsert('harish');

var T = new Twit({
  consumer_key: env.api_key,
  consumer_secret: env.api_secret,
  access_token: env.access_token_key,
  access_token_secret: env.access_token_secret
});
var unitedStates = [-125.02,31.77,-89.99,48.5,-90.04,30.03,-83.4,47.77,-83.89,24.21,-77.24,41.94,-80.29,32.67,-73.64,43.05,-76.51,39.61,-68.9,45.24,-106.04,29.21,-75.75,33.68,-99.8,26.24,-95.44,30.71 ];
var stream = T.stream('statuses/filter', {locations: unitedStates, language: 'en'});

stream.on('tweet', function(tweet){
  util.stripAllTheThings(tweet.text, function(stripped){
    util.parseText(stripped, function(word){
      dbHelps.updateOrInsert(word);
    });
  });
  // console.log(tweet.text);
});

// stream.on('error', function(json){
//   console.log("error: " + json);
// });

stream.on('disconnect', function(disconnectMessage){
  console.log("disconnecting: " + disconnectMessage);
});

stream.on('warning', function(warning){
  fs.appendFile('./warningLog.txt',"\n" + warning + "\n", {encoding:'utf8'}, function(err){
    console.log("trying to write to warnignLogs threw the following error: " + err);
  });
  console.log(warning);
});


// setTimeout(function(){
//   stream.stop();
// }, 5000);