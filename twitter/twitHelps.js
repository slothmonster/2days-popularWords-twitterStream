var zapreshonie = {
  "like": true, "with": true, "that": true, "this": true, "just":true, "your":true, "youre":true, "you're":true,
  "about":true, "know":true, "what":true, "when":true, "where":true, "they":true, "some":true, "more":true, "than":true, "will":true
};

exports.parseText = function(tweet, callback){
  var words = tweet.split(" ");
  // console.log(words);
  console.log("inside parseText with words: " + words);
  if(words && words.length > 0){
    var i;
    for(i=0; i<words.length; i++){
      var tempStr = words[i];
      if(typeof tempStr === 'string' && tempStr.length > 0 && !zapreshonie[tempStr.toLowerCase()]){
        console.log("logging word: " + words[i]);
        callback(words[i]);
      }
    }
  }

};


exports.stripAllTheThings = function(tweet, callback){
  var stripped = tweet.replace(/\b[a-zA-z]{1,3}\b/g, "");
  stripped = stripped.replace(/(^|[^@\w])@(\w{1,15})\b/g,"");
  stripped = stripped.replace(/[\\.,\-\/#!\$%\^&\*;:{}=\-_`~()\'\"?@+><\[\]]/g,"");
  stripped = stripped.replace(/[\u0300-\u036F]/ig, '');
  stripped = stripped.replace(/(\s{2,})|(^\s)/g, "");
  callback(stripped);
};