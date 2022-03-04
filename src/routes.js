const express = require('express');
const EmailController = require('./controllers/EmailController');

var router = express.Router();

router.post('/sendEmail', EmailController.sendEmail);

module.exports = router;
