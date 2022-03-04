const express = require('express');
var cors = require('cors');
var router = require('./src/routes');

const app = express();
const port = 3000;
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/', router);

app.listen(port, () => {
  console.log(`API is runing on port ${port}`);
})




