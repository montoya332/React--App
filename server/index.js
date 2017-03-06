const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

/* App Setup */
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));//TODO: remove wildcard , force json for now

/* Server Setup */
const port = process.env.PORT || 3000
const server = http.createServer(app);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})

app.get('/', function (req, res) {
  res.send('Hello World! /')
})

app.get('/route', function (req, res) {
  res.send('Hello route!')
})
