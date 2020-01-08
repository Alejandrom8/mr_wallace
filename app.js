var createError = require('http-errors'),
    express = require('express'),
    session = require('express-session'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    cors = require('cors'),
    UUID = require('uuid'),
    socket_io = require('socket.io');

//Routes
var loginRouter = require('./routes/login'),
    signup = require('./routes/signup'),
    utilities = require('./routes/utilities');

var app = express();
var io = socket_io();
app.io = io;

io.configure(() => {
  io.set('log lavel', 0);
  io.set('authorization', (handshakeData, callback) => {
    callback(null, true);
  })
});

//views
// app.use('views', path.join(__dirname, ''))

//app variables
let ssn;

//Middlewares
//  setting up the sessions system
app.use(session({
  'secret': 'A_lex 123',
  'resave': false,
  'saveUninitialized': false
})); 
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/login', loginRouter);
app.use('/sign_up', signup);
app.post('/utilities/searchCoincidencesForNickname', utilities.searchNicknameCoincidences);
app.post('/utilities/searchCoincidencesForEmail', utilities.searchEmailCoincidences)
app.get('/home', (req, res) => {
  ssn = req.session;
  console.log(ssn);
  res.send('Bienvenido a esto!');
});

//Sockets
io.on('connection', (client) => {
  client.userid = UUID();
  client.emit('onconnected', { id: client.userid });
  console.log('\t socket.io:: player ' + client.userid + ' connected');
  client.on('disconnect', function () {
    //Useful to know when someone disconnects
    console.log('\t socket.io:: client disconnected ' + client.userid );
  }); 
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // sending the error json 
  res.status(err.status || 500);
  res.json(
    {
      "message": err.message,
      "error": req.app.get('env') === 'development' ? err : {}
    }
  );
});

module.exports = app;
