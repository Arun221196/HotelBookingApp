
var express = require('express');
var app = express();
var bodyParse = require('body-parser');
var router = require('./routes/router');
var config = require('./config');
app.use(bodyParse.json());

app.all('*', router);


app.listen(config.port, function () {
    console.log(`App listening on port ${config.port}!`);
});