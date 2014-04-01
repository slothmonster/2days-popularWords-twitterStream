var express = require('express');

// var util = require('./lib/utility');
// var handler = require('./lib/request-handler');

var app = exports.app = express();

app.configure(function() {
  app.use(express.bodyParser());
});


module.exports = app;
