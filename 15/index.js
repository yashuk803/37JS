// Пример Node js сервер с работой с потоками
//Для работы сервера с закрытым терминалом модуль - forever, 
//а если просто для автоматического обновления сервера можно использовать - nodemon 


var buffer = require('buffer');
var http   = require('http');
var fs     = require('fs');

var port = 3000;

/**
 *Класс для чтения файла
 *@constructor
 *@param {string} filename
 *@param {object} res объект ответа для вывода файла на экран
 **/

class ReadFile {

    constructor(filename, res) {
        this.filename = filename;
        this.res = res;
        this.size = 5000; 
    }

    read() {
        if (this.getSize() > this.size) {
            this.getFileStream();
        } else {
            this.getFile();
        }
    }
    getSize() {
        let stats = fs.statSync(this.filename);
        return stats["size"];
    }

    /**
     *Чтение файла в обычном режиме
     *
     **/
    getFile() {
        var self = this;
        fs.readFile(this.filename, 'utf8', function(err, data) {
            if (err) throw err;
            self.res.write(data);
            self.res.end();
        });
    }

    /**
     *Чтение файла в Stream
     *
     **/
    getFileStream() {
        let stream = fs.createReadStream(this.filename)
        stream.pipe(this.res);
    }
}


var server = http.createServer(function(req, res) {

    switch (req.url) {
        case '/stream':
            let readFile = new ReadFile('file.text', res);
            readFile.read();
            break;
        case '/file':
            let readFile = new ReadFile('file.text', res);
            readFile.read();
            break;
        default:
            res.write('Hello World');
            res.end();
    }

}).listen(port, function() {
    console.log(`Server at http://localhost:${port}`)
});