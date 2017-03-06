const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes');

/* App Setup */
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' })); //TODO: remove wildcard , force json for now
routes(app);

/* Server Setup */
const port = process.env.PORT || 3000
const server = http.createServer(app);

app.listen(port, function() {
	console.log(`Example app listening on port ${port}!`)
})