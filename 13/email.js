var nodemailer = require('nodemailer');

/**
 * Сreate reusable transporter object 
 * using the default SMTP transport
 */

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'yashuk803',
    pass: '******',
  },
});

/**
 * Run in metres
 *
 * @param int $metres Metres
 */


var mailOptions = {
  from: 'yashuk803@gmail.com',
  to: 'yashuk803@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

/**
 * Run in metres
 *
 * @param int $metres Metres
 */

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});