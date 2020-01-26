class Bullet extends Phaser.Physics.Arcade.Sprite{

    /**
     * 
     * @param {Phaser.Scene} scene - the Phaser.Scene where the bullets have to appear.
     * @param {number} x - the x position where the bullets will be generated.
     * @param {number} y - the y position where the bullets will be generated.
     */
    constructor(scene, x, y){
        super(scene, x, y, 'laser')
        this.scene = scene;

        let custom_body = new Phaser.Physics.Arcade.Body(this.scene.physics.world, this)
        this.body = custom_body;
        this.setBounce(0.2)
        this.scene.physics.world.enableBody(this, 0);
    }

    fire(x, y, direction){
        this.body.setAllowGravity(false)
        this.body.reset(x, y)
        this.setActive(true)
        this.setVisible(true)
        this.setVelocityX(direction == 'right' ? 700 : - 700)
        super.fireTime = this.scene.time.now + 300;
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta)
        if (this.x <= 300){
            this.setActive(false);
            this.setVisible(false);
        }
    }
}