var createError = require('http-errors'),
    express = require('express'),
    session = require('express-session')({
      'secret': 'A_lex 123',
      'resave': false,
      'saveUninitialized': false
    }),
    sharedSession = require('express-socket.io-session'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    cors = require('cors'),
    UUID = require('uuid'),
    socket_io = require('socket.io'), 
    Player = require('./models/Player');

//Routes
var loginRouter = require('./routes/login'),
    signup = require('./routes/signup'),
    utilities = require('./routes/utilities');

var app = express();
var io = socket_io();
app.io = io;

//views
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//app variables
let ssn;

//Middlewares
//  setting up the sessions system
app.use(session); 
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')))

io.use(sharedSession(session));

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

app.get('/game', (req, res) => {
  res.render('game')
});

io.on('connection', (socket) => {
  Player.onConnect(io, socket, socket.handshake.session);

  socket.on('disconnect', () => {
    Player.onDisconnect(io, socket);
    socket.handshake.session.destroy();
  })
})

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
