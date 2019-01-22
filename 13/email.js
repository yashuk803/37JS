var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'imap.gmail.com',
  port: 993,
  auth: {
    user: 'yashuk803@gmail.com',
    pass: 'marmeladik12',
  },
  tls: true
});

var mailOptions = {
  from: 'yashuk803@gmail.com',
  to: 'yashuk803@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});