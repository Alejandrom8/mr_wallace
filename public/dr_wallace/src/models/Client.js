class Client extends Player{

    /**
     * 
     * @param {Game} scene 
     * @param {*} x 
     * @param {*} y 
     * @param {*} texture 
     * @param {*} frame 
     * @param {[any]} collisions
     */
    constructor(scene, x, y, texture, frame, collisions){
        super(scene, x, y, texture, frame, collisions);

        this.scene = scene;
        this.socket = io.connect('/');

        this.socket.on('newPlayer', function(playerInfo){
            this.scene.addNewPlayer(playerInfo.id, playerInfo.x, playerInfo.y)
        })

        this.socket.on('allPlayers', function(data){
            console.log(data);
            data.forEach(player => {
                this.addNewPlayer(player.id, player.x, player.y)
            }); 
        })

        this.socket.on('remove', function(playerId){
            this.scene.removePlayer(playerId)
        })

        this.socket.on('moveRight', function(playerInfo){
            console.log(playerInfo)
        })
    }

    sendMovements(){
        this.socket.emit('movement', { x: this.body.x, y: this.body.y })
    }

    jump(){
        this.setVelocityY(-280)
        // this.sendMovements()
    }

    walkRight(){
        this.anims.play('right', true)
        this.setVelocityX(250)
        this.sendMovements();
    }

    walkLeft(){
        this.anims.play('left', true)
        this.setVelocityX(-250)
        // this.sendMovements();
    }

    stopWalk(){
        this.anims.play('still', true)
        this.setVelocityX(0)
    }
}