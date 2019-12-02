var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//This is for method override so we can send delete, put, etc... requests from HTML.
var methodOverride = require('method-override');
//Library For remembering browser's session by storing a session id into a cookie. Refer W6D5
var session = require('express-session');
//passport is a library that manages Oauth stuff. W6 D5
var passport = require('passport');

// Loading the dotenv config so we can use the dotenv library and config for hiding sensitive data. It will store all variables in our .env file under process.env.varName
require('dotenv').config();

// Connect to the MongoDB with mongoose.
require('./config/database');
// Load in the config file for passport.
// passport config module is not middleware. Its code will basically configure Passport and be done with it. We're not going to export anything either.
require('./config/passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//?_method='method' will be the unique appendage that will indicate that the post action will be overwritten to whatever is the method specified.
app.use(methodOverride('_method'));

//Secret is used to digitally sign the session cookie making it very secure. You can change it to anything you want. Don't worry about the other two settings, they are only being set to suppress deprecation warnings.
//If we open the web app and open the resources tab in DevTools, then expand Cookies in the menu on the left: A cookie named connect.sid confirms that the session middleware is doing its job.
app.use(session({
  secret: 'UnderGround Journal',
  resave: false,
  saveUninitialized: true
}));
//Initialize passport
//Be sure to mount it after the session middleware and always before any of your routes are mounted that would need access to the current user:
app.use(passport.initialize());
//Intialize passport session.
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
