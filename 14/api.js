// Пример Node js сервер и использование модуля request
var request = require('request');
var http    = require('http');

var url = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3&fbclid=IwAR0e-FpR39qr1EMc2Ew2jgbRXgJTOeQ52FIi-ARcF6vIE1kSvLONrIaJdM4";
var option = {url: url};

var server = http.createServer(function(req, res) {

    switch (req.url) {
        case '/api':
            let getRes = request(option, function(error, response, body) {
                if(error) throw error;
            	console.log(body);
            });
            req.pipe(getRes)
    		getRes.pipe(res)
            break;
        default:
            res.write('Hello World');
            res.end();
    }

}).listen(3000, function() {
    console.log('Server at http://localhost:3000')
});