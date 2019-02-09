var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'yashuk803',
        pass: 'marmeladik12',
    },
});

module.exports = transporter;