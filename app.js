var createError = require('http-errors'),
    express = require('express'),
    session = require('express-session'),
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
app.use(express.static(path.join(__dirname, 'node_modules')))

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
  Player.onConnect(io, socket);

  socket.on('disconnect', () => {
    Player.onDisconnect(io, socket);
  })
})

//Esto complica más las cosas cuando su unica ventaja es la UUID.
// app.get('/newPlayer/:window_width', (req, res) => {
//   const newPlayer = {
//     id: UUID(),
//     x: req.params.window_width + (-(Math.floor(Math.random() * 200)) + Math.floor(Math.random() * 200)),
//     y: 100
//   }
//   res.json(newPlayer)
// })

// app.lastPlayerId = 0;
//Sockets
// function getAllPlayers(){
//   var players = [];
//   Object.keys(io.sockets.connected).forEach(function(socketID){
//       var player = io.sockets.connected[socketID].player;
//       if(player) players.push(player);
//   });
//   return players;
// }

// io.on('connection', (socket) => {

//   socket.emit('onconnected', { id: socket.id});

//   socket.on('newPlayer', (playerData) => {
//     socket.player = playerData;

//     console.log('\t socket.io:: player ' + socket.player.id + ' connected');

//     socket.emit('updateAllPlayers', getAllPlayers())
//     socket.broadcast.emit('newPlayer', socket.player);

//     socket.on('walk', () => {
//       io.emit('playerMovingRigth', socket.player.id)
//     })

//     socket.on('stopWalk', () => {
//       io.emit('playerStoped', socket.player.id)
//     })

//     socket.on('movement', coordinates => {
//       console.log(`The player ${socket.id} has moved to: ${coordinates}`)
//       socket.player.x = coordinates.x;
//       socket.player.y = coordinates.y;
//       io.emit('moveRight', socket.player);
//     })

//     socket.on('disconnect', function(){
//       io.emit('remove', socket.player.id)
//     })
//   });

//   socket.on('newEntry', (socket) => {
//     console.log('a new player has connected')
//   })
// });

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
