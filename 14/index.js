
// Пример Node js сервер и использование событий EventEmitter
var http      = require('http');
var fs        = require('fs');
var Event     = require('events').EventEmitter;
var sendFile  = require('./send_file'); //Модуль вывода файла

var emt = new Event();


var server = http.createServer(function(req, res) {

    switch (req.url) {
        case '/contact':
            var file = fs.ReadStream('index.html');
            sendFile.sendFile(file, res);
            break;
        case '/login':
            emt.emit('logIn', user);
            res.end();
            break;
        case '/logout':
            emt.emit('logOut', user);
            res.end();
            break;
        case '/read-file':
            emt.emit('read', 'file.text', user);
            res.end();
            break;
        case '/about':
            console.log(req);
            res.end();
            break;
        case '/stop':
            console.log('exit');
            req.connection.end();
            req.connection.destroy;
            server.close();
            break;
        default:
            res.write('Hello World');
            res.end();
    }

}).listen(3000, function() {
    console.log('Server at http://localhost:3000')
});


var user = {
    name: 'Dima',
    date: new Date().getTime()
};

//Событие входа пользователя на сайте
emt.on('logIn', function(data) {
    console.log('Сейчас на сайте ' + data.name);
    console.log('Время: ' + data.date);
});

//Событие выхода пользователя с сайта
emt.on('logOut', function(data) {
    console.log('Покинул сайт ' + data.name);
    console.log('Время: ' + data.date);
});

//Событие чтение файла пользователем
emt.on('read', function readFileContent(fileName, user) {
    console.log(user.name + " reading " + fileName + " file started:");
    fs.readFile(fileName, 'utf8', readFile);
});

function readFile(err, data) {
    console.log("Reading " + data + " file done successfully.");
}



