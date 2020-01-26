class Player{

    static onConnect(io, socket, session){
        socket.on('newPlayer', (position) => {
            socket.player = new Player(socket.id, session.playerData.nickname, position)
            Player.list[socket.player.id] = socket.player;

            console.log('A new player has been created with nickname: ' + socket.player.nickname);

            var players = [];

            Object.keys(io.sockets.connected).forEach(function(socketID){
                var player = io.sockets.connected[socketID].player;
                if(player) players.push(player);
            });

            socket.emit('updateAllPlayers', players);
            socket.broadcast.emit('newPlayer', socket.player);

            socket.on('keypress', (direction, coordinates) => {
                socket.player.update(direction, coordinates);
                socket.broadcast.emit('move', socket.player);
            })

            socket.on('jump', () => {
                socket.broadcast.emit('jump', socket.player.id);
            })
    
            socket.on('stop', (coordinates) => {
                socket.player.updatePosition(coordinates);
                socket.broadcast.emit('stop', socket.player);
            })
        })
    }

    static onDisconnect(io, socket){
        if(Player.list)
            delete Player.list[socket.id]
        io.emit('remove', socket.id)
    }

    constructor(id, nickname, position){
        this.id = id;
        this.nickname = nickname;
        this.x = position.x;
        this.y = position.y;
        this.direction = position.direction;
    }

    updatePosition(coordinates){
        this.x = coordinates.x;
        this.y = coordinates.y;
    }

    update(direction, coordinates){
        this.updatePosition(coordinates);
        this.direction = direction;
    }
}

Player.list = {};

module.exports = Player;