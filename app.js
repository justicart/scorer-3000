var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var back = require('express-back');

var mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/scorer';
mongoose.connect(mongoURI);

var index = require('./routes/index');
var games = require('./routes/games');
var players = require('./routes/players');
const auth = require('./routes/auth');
const holes = require('./routes/holes');
const scores = require('./routes/scores');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/materialize', express.static(__dirname + '/node_modules/materialize-css/dist/js/'));
app.use('/jquery', express.static(__dirname + '/node_modules/materialize-css/node_modules/jquery/dist/'));

const User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// api
app.use('/api/games', games)
app.use('/api/players', players)
app.use('/api/auth', auth);
app.use('/api/holes', holes);
app.use('/api/scores', scores);

app.use('*', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
