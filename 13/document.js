var fs = require('fs');

var newLineChar = process.platform === 'win32' ? '\r\n' : '\n';
var text = 'Hello node.js';

fs.appendFile('file.txt', `${text}${newLineChar}`, function(err, data){
	if(err) throw err;
});

fs.readFile('file.txt', 'utf8', function(err, data){
	if(err) throw err;
	console.log(data);
});