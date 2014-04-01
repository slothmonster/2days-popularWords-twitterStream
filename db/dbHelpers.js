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


// db.mycollection.findAndModify({
//     query: { name: 'mathias' },
//     update: { $set: { tag:'maintainer' } },
//     new: true
// }, function(err, doc, lastErrorObject) {
//     // doc.tag === 'maintainer'
// });