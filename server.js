var app = require('./server-config.js');
var twitter = require('./twitter/twitConf');
var snapshot = require('./db/snapshotRoutine');

var port = process.env.PORT || 4568;

app.listen(port);
console.log('Server now listening on port ' + port);

snapshot();

// setTimeout(function(){
//   stream.stop();
// }, 5000);