var fs = require('fs'); // this engine requires the fs module



function init(filePath, options, callback) {
	 fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));
   
    var rendered = textReplace(options, content);
    return callback(null, rendered);
  });
}

function textReplace(options, content) {
	var newContent = content.toString();
	for (var key in options) {
		if(typeof options[key] !== 'string') continue;
		newContent = newContent.replace('{%'+ key +'%}', ''+ options[key] +'');
      }
      return newContent;
}

module.exports = init;