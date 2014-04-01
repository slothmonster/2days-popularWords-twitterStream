var dbHelps = require('./dbHelpers');
var db = require('./mongoConf');
var fs = require('fs');

var snapshot = function(){
  dbHelps.fetchTopTwentyWords(function(docs){
    if(docs !== undefined && docs.length > 0){
      var snapshot = {
        'createdAt': new Date(),
        'words': docs
      };
      
      db.archives.save(snapshot, function(err, docs){
        if(err){
          fs.appendFile('./archiveLog.txt',"\n" + err + "\n", {encoding:'utf8'}, function(err){
            console.log("trying to write to archives threw the following error: " + err);
          });
          console.log(err);
        }
      });
    }
  });
  setTimeout(snapshot, 600000); //10 minute interval is 600000
};

module.exports = snapshot;

