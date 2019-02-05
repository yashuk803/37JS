var express = require('express');
var router = express.Router();
var Converter = require('../custom-modules/converter.js');
var request = require('request');

var urlApi = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3';

var baseCurrencyUs = '';



/* GET home page. */
router.get('/', function(req, res) {
  request(urlApi, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      // do more stuff
      info.forEach(function(element) {
      	if(element.ccy == 'USD') {
      		baseCurrencyUs = element.buy;
      		return;
      	}
	  });
	  
	  let converter = new Converter(baseCurrencyUs);
	  let curUa = 111;
	  let converterUa = converter.convertToUa(curUa);

	  res.render('index', { curUa: curUa, converterUa: converterUa});
    }
  })
});


module.exports = router;
