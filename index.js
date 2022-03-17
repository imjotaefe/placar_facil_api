const express = require('express');
var cors = require('cors');
var router = require('./src/routes');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/', router);

app.listen(listen(process.env.PORT || 5000), () => {
  console.log(`API is runing on port ${listen(process.env.PORT || 5000)}`);
})




