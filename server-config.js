var express = require('express');

// var util = require('./lib/utility');
// var handler = require('./lib/request-handler');

var app = exports.app = express();

app.configure(function() {
  app.use(express.bodyParser());
});

// exports.stream = new Stream({
//   consumer_key: env.api_key,
//   consumer_secret: env.api_secret,
//   access_token_key: env.access_token_key,
//   access_token_secret: env.access_token_secret
// });


module.exports = app;
