exports.parseText = function(tweet, callback){
  var words = tweet.split(" ");
  // console.log(words);
  console.log("inside parseText with words: " + words);
  if(words && words.length > 0){
    var i;
    for(i=0; i<words.length; i++){
      var tempStr = words[i];
      if(typeof tempStr === 'string' && tempStr.length > 0){
        console.log("logging word: " + words[i]);
        callback(words[i]);
      }
    }
  }

};

exports.stripAllTheThings = function(tweet, callback){
  var stripped = tweet.replace(/\b[a-zA-z]{1,1}\b/g, "");
  stripped = stripped.replace(/(^|[^@\w])@(\w{1,15})\b/g,"");
  stripped = stripped.replace(/[\\.,\-\/#!\$%\^&\*;:{}=\-_`~()\'\"?@+><\[\]]/g,"");
  stripped = stripped.replace(/(\s{2,})|(^\s)/g, "");
  callback(stripped);
};