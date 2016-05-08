var express = require('express');
var bodyParser = require('body-parser');

//var errorHandler = require('../server/utils/errorHandler');
var router = require('../server/routes');
var config = require('../config');

//initialize the app
var app = module.exports = express();

//set up static files directory
app.use(express.static(__dirname + '/../' + config.staticDir));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(router);