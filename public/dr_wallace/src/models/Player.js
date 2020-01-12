class Player{
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(scene, x, y){
        this.socket = io.connect('/');
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.players = {};
    }

    create(){
        this.socket.emit('newPlayer', {x: this.x, y: this.y, direction: 'right'})

        this.socket.on('newPlayer', (data) => {
            this.addPlayer(data.id, data.x, data.y, data.direction);
        })

        this.socket.on('updateAllPlayers', data => {
            console.log(data);
            
            for(var i = 0; i < data.length; i++){
                this.addPlayer(data[i].id,data[i].x,data[i].y);
            }

            this.scene.cameras.main.startFollow(this.players[this.socket.id], true);

            this.socket.on('move', (data) => {
                this.players[data.id].setVelocityX(data.direction == 'right' ? 200 : -200);
                this.players[data.id].anims.play(data.direction, true)
            })

            this.socket.on('jump', (id) => {
                this.players[id].setVelocityY(-280)
            })

            this.socket.on('stop', (data) => {
                this.players[data.id].setVelocityX(0)
                this.players[data.id].setPosition(data.x, data.y)
                this.players[data.id].anims.play('still', true);
            })

            this.socket.on('remove', playerId => {
                this.removePlayer(playerId)
            })
        })        
    }

    addPlayer(id, x, y, direction){
        this.players[id] = new SpritePlayer(this.scene, x, y)

        this.scene.add.existing(this.players[id])

        this.players[id].anims.play(direction, true)
        this.players[id].anims.stop()

        console.log('A new player has been added to the room');
    }

    removePlayer(id){
        this.players[id].destroy()
        delete this.players[id];
    }

    getCoordinates(){
        return {
            x: this.players[this.socket.id].x,
            y: this.players[this.socket.id].y
        }
    }

    jump(){
        if(this.players[this.socket.id].isTouchingDown()){
            this.players[this.socket.id].setVelocityY(-280)
            this.socket.emit('jump')
        }
    }

    walkRight(){
        this.players[this.socket.id].setVelocityX(200)
        this.players[this.socket.id].anims.play('right', true)
        this.socket.emit('keypress', 'right', this.getCoordinates())
    }

    walkLeft(){
        this.players[this.socket.id].setVelocityX(-250)
        this.players[this.socket.id].anims.play('left', true)
        this.socket.emit('keypress', 'left', this.getCoordinates())
    }

    stopWalk(){
        this.players[this.socket.id].setVelocityX(0)
        this.players[this.socket.id].anims.play('still', true)
        this.socket.emit('stop', this.getCoordinates())
    }
}