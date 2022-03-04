const PDFHelper = require('../helpers/PDFHelper');
const EmailService = require('../services/emailService');

const sendEmail = async (req, res, next) => {
  console.log(req.body);
  const receiver = req.body.receiver;

  try{
  const { fileName, path } = await PDFHelper.generate(req.body);
  
  const emailHandler = new EmailService();
  await emailHandler.send(receiver,fileName, path);

  res.json({message: "TUDO OK"});
  } catch(err){
    next(err);
  }
};

module.exports = {
  sendEmail, 
};