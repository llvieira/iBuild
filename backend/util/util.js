const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

function sendEmail(userEmail) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'contact.ibuild.app@gmail.com', // generated ethereal user
      pass: 'ibuild123', // generated ethereal password
    },
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"iBluild" <contact.ibuild.app@gmail.com>', // sender address
    to: userEmail, // list of receivers
    subject: 'Confirmação de Registro', // Subject line
    text: 'Bem vindo ao iBuild', // plain text body
    html: '<b>Bem vindo ao iBuild!</b>', // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    }
    nodemailer.getTestMessageUrl(info);
    return info;
  });
}

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

module.exports.sendEmail = sendEmail;
module.exports.generateToken = generateToken;
