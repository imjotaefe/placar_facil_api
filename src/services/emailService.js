var nodemailer = require('nodemailer');
require('dotenv').config();

class EmailService{

  constructor(){
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }
  
  send(receiver,fileName, path){
    var mailOptions = {
      from: process.env.EMAIL_USER,
      to: receiver,
      subject: 'Sumula Placar Fácil',
      html: '<h1>Olá</h1><p>Segue em anexo um pdf contendo a sumula da partida</p>' ,
      attachments: [
        {
          fileName,
          path
        }
      ]      
    };

    this.transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
  
}

module.exports = EmailService;