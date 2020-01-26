/**
 * @type {Player} - This object generate an instance of a local player with his controls 
 * and his settings like number of bullets or position in the scenario.
 */
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

    /**
     * Creates the socket.io events for this player and emit
     * that a new player has been enterd to this room.
     * Note: this function should be called only in a 
     * Phaser.Scene.create function and after setting up 
     * the physics for the scene.
     */
    create(){
        this.socket.emit('newPlayer', {x: this.x, y: this.y, direction: 'right'})

        this.socket.on('newPlayer', (data) => {
            this.addPlayer(data.id, data.nickname, data.x, data.y, data.direction);
        })

        this.socket.on('updateAllPlayers', data => {
            
            for(var i = 0; i < data.length; i++){
                this.addPlayer(data[i].id, data[i].nickname, data[i].x, data[i].y);
            }

            this.scene.cameras.main.startFollow(this.players[this.socket.id], true);

            this.socket.on('move', (data) => {
                this.players[data.id].body.setVelocityX(data.direction == 'right' ? 200 : -200);
                this.players[data.id].spritePlayer.anims.play(data.direction, true)
            })

            this.socket.on('jump', (id) => {
                this.players[id].body.setVelocityY(-280)
            })

            this.socket.on('stop', (data) => {
                this.players[data.id].body.setVelocityX(0)
                this.players[data.id].setPosition(data.x, data.y)
                this.players[data.id].spritePlayer.anims.play('still', true);
            })

            this.socket.on('remove', playerId => {
                this.removePlayer(playerId)
            })
        }) 
        
        this.bullets = new Bullets(this.scene, 100)
    }
    
    /**
     * 
     * @param {string} id - the socket id that the server has generated
     * @param {number} x - the horizontal position where the player have to appear
     * @param {number} y - the vertical position where the player have to appear
     * @param {string} direction - the last direction where the player has moved
     */
    addPlayer(id, nickname, x, y, direction){
        this.players[id] = new ContainerPlayer(this.scene, x, y, {
            nickname : nickname
        });
        this.players[id].spritePlayer.anims.play(direction ? direction : 'right', true);
        this.players[id].spritePlayer.anims.stop()

        // this.players[id] = new SpritePlayer(this.scene, x, y)
        // this.players[id].anims.play(direction, true)
        // this.players[id].anims.stop()

        console.log('A new player has been added to the room: ' + nickname);
    }

    /**
     * 
     * @param {number} id - the socket id that the server has generated
     */
    removePlayer(id){
        this.players[id].destroy()
        delete this.players[id];
    }

    getCoordinates(){
        return {
            x: this.players[this.socket.id].spritePlayer.x,
            y: this.players[this.socket.id].spritePlayer.y
        }
    }

    shot(direction){
        const coords = this.getCoordinates();
        this.bullets.fireBullet(coords.x, coords.y, direction)
    }

    jump(){
        if(this.players[this.socket.id].isTouchingDown()){
            this.players[this.socket.id].body.setVelocityY(-280)
            this.socket.emit('jump')
        }
    }

    walkRight(){
        this.players[this.socket.id].body.setVelocityX(200)
        this.players[this.socket.id].spritePlayer.anims.play('right', true)
        this.socket.emit('keypress', 'right', this.getCoordinates())
    }

    walkLeft(){
        this.players[this.socket.id].body.setVelocityX(-250)
        this.players[this.socket.id].spritePlayer.anims.play('left', true)
        this.socket.emit('keypress', 'left', this.getCoordinates())
    }

    stopWalk(){
        this.players[this.socket.id].body.setVelocityX(0)
        this.players[this.socket.id].spritePlayer.anims.play('still', true)
        this.socket.emit('stop', this.getCoordinates())
    }
}