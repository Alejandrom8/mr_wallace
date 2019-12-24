var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

//Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var signup = require('./routes/signup');

var app = express();

//app variables
let ssn;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

//Middlewares
//  setting up the sessions system
app.use(session({
  'secret': 'A_lex 123',
  'resave': false,
  'saveUninitialized': false
})); 

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter.get);
app.use('/login', loginRouter.post);
app.use('/sign_up', signup.get);
app.use('/sign_up', signup.post);

app.get('/home', (req, res) => {
  ssn = req.session;
  console.log(ssn);
  res.send('Bienvenido a esto!');
});

// app.use(express.static(__dirname, "public/images"));
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
