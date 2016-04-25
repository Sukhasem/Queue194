// Init Config value
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Use Database before use Express
var mongoose = require('./config/mongoose');
var express = require('./config/express');
var passport = require('./config/passport');

// Use Database before use Express
var db = mongoose(); // return mongoose.connect(config.mongoUri)
var app = express();
var passport = passport();

app.listen(3000);

module.exports = app;

console.log('Server running ...');
