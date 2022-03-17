const PDFHelper = require('../helpers/PDFHelper');
const EmailService = require('../services/emailService');
const dayjs = require("dayjs");

const sendEmail = async (req, res, next) => {
  const body = req.body;
  const receiver = req.body.receiver;

  const game = body?.sumula;
  
  const sumula = Object.keys(game).flatMap(function (key) {
    return key !== 'gameFinishedAt' ? game[key] : [];
  });
  
  const gameSumula = sumula.map((item, index)=> {
    if(index < sumula.length-2){
      const meuGame = Object.keys(item).flatMap(function (key) {
        return  key !== 'gameFinishedAt' && key !== 'expediteSystemWasUsed' ? item[key] : [];
      });
      return {
        gameNumber:index + 1,
        meuGame,
        gameFinishedAt: item.gameFinishedAt,
        expediteSystemWasUsed: item.expediteSystemWasUsed === true ? 'Sim' : 'Não'
      };
    }
    return null;
  })

  gameSumula.pop();
  gameSumula.pop();

const gameFinishedAt = dayjs(game.gameFinishedAt).format('DD/MM/YYYY');
  const formatedData = {
    ...body,
    gameSumula,
    gameFinishedAt,
    gameType: body.gameType === 'single'? 'individual': 'dupla'
  }

  try{
  const { fileName, path } = await PDFHelper.generate(formatedData);
  
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