var db = require('./mongoConf');

exports.updateOrInsert = function(word){
  db.words.findAndModify({
    query: {word: word},
    update: { $inc: {count: 1} },
    new: true
  },function(err, doc, lastErrorObject){
    if(err){
      throw err;
    }
    if(doc === null){
      // console.log("doc return null");
      db.words.save({
        word: word,
        count: 1
      });
    } else {
      // console.log(doc);
    }
  });
};

exports.fetchTopTwentyWords = function(callback){
  db.words.find({count:{$gt: 2}}).limit(20, function(err, docs){
    if(err){
      console.log("we got an error trying to retrieve top 20 records: " + err);
    } else {
      // console.log("we should be sending back these docs: " + docs);
      callback(docs);
    }
  });
};