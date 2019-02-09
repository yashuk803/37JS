var express    = require('express');
var validator  = require('node-input-validator');
var config     = require("./../bin/config");

var router     = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('contact', { title: 'Express' });
});
router.post('/', async function(req, res, next) {

    let validation = new validator( req.body, {
        name:'required|string',
        email:'required|email',
        text:'required',
    });

    validation.check().then(function (matched) {
        if (!matched) {
            res.status(422).send(validation.errors);
        }
    });
    var params = {
        from: 'yashuk803@gmail.com',
        to: req.body.email,
        subject: req.body.name,
        text: req.body.text
    };

    sendLetter(params, res);


});

function sendLetter(params, res) {
    config.sendMail(params, function(error, info){
        if (error) {
            console.log(error);
        } else {
            res.render('contact', { success: 'Express' });
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = router;
