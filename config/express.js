// Webserver
var express = require('express');
// Production mode
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require("body-parser");
// Path using
var path = require('path');
// SASS
var sass = require('node-sass-middleware');
// Form Validation
var validator = require('express-validator');
// Session
var cookieSession = require('cookie-session');
// Flash message [before Passport]
var flash = require('connect-flash');
// Passport
var passport = require('passport');
// Connect database to MongoDB
//var mongoose = require('mongoose');
//var uri = 'mongodb://localhost/test';
//var db = mongoose.connect(uri);
// Config
var config = require('./config');

module.exports = function() {
  var app = express();
  // Init Path
  var localPath = path.join(__dirname, '..');

  // [HEAD] Set session
  app.use(cookieSession({
    name: 'session',
    keys: [config.sessionSecret, 'ase6f56eafad59']
  }));

  // Flash init [before Passport]
  app.use(flash());
  // Init Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // [HEAD] Select Production mode
  // 1) development - Show full response [Easy to Debug]
  // 2) production - compressing response
  // For windows,can be set in CMD "set NODE_ENV=development" || "set NODE_ENV=production"
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else {
    app.use(compression);
  }
  // Handler x-WWW-form-urlencoded
  // exended
  // 1) true - Can handle Nested array
  // 2) false - Only handle String and Array
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  // Handler JSON file
  app.use(bodyParser.json());
  // Set form validtion
  // Must be continue from bodyParser, because we don't want other function interrupt data from user to validate
  app.use(validator());


  // [HEAD] Use Jade for Redering
  // Set views folder in ./app/views
  // [NOTICE] app.set working on runtime "node server", so it has to use path from server.js
  //app.set('views', './app/views'));
  app.set('views', localPath + '/app/views');
  // Reder using Jade
  app.set('view engine', 'jade');


  // [HEAD] Routing
  require('../app/routes/index.routes')(app);
  require('../app/routes/user.routes')(app);
  require('../app/routes/restaurant.routes')(app);
  require('../app/routes/reservation.routes')(app);

  // [HEAD] Set SASS
  // outputStyle canbe
  // 1) compressed - Compressing CSS [Long one line - Hard to read]
  // 2) compact - Compressing CSS [Readable]
  // 3) expended - Normal CSS
  // [NOTICE] app.use(sass()) must init before Express, because We wand SASS worked then response back to Browser [Express]
  app.use(sass({
    src: localPath + '/sass',
    dest:  localPath + '/public/css',
    outputStyle: 'compressed',
    prefix: '/css',
    debug: true,
    indentedSyntax: true
  }));


  // [HEAD] Set root path for express
  // It should be after routing
  //app.use(express.static('./public'));
  app.use(express.static(localPath + '/public'))

  return app;
};
