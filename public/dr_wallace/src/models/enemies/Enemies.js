class Enemy extends Phaser.Physics.Arcade.Sprite{
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {*} x 
     * @param {*} y 
     */
    constructor(scene, x, y){
        super(scene, x, y, 'enemy')
    }
}