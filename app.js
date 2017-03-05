const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
// mongoose.connect( 'mongodb://localhost/scorer' );
const db = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/scorer';
mongoose.connect( db );

const index = require('./routes/index');
const players = require('./routes/players');
const games = require('./routes/games');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/materialize', express.static(__dirname + '/node_modules/materialize-css/dist/js/'));
app.use('/jquery', express.static(__dirname + '/node_modules/materialize-css/node_modules/jquery/dist/'));
app.use('/', index);
app.use('/players', players);
app.use('/games', games);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
