var mongojs = require('mongojs');
var env = require('../env_config');

var mongoURI = env.prod ? env.mongo.uri : 'mongodb://localhost/twitter';
var db = mongojs(mongoURI, ['words']);

module.exports = db;