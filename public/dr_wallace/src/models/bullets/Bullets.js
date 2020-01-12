class Bullet extends Phaser.Physics.Arcade.Sprite{

    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(scene, x, y){
        super(scene, x, y, 'laser')
        this.scene = scene;

        let custom_body = new Phaser.Physics.Arcade.Body(this.scene.physics.world, this)
        this.body = custom_body;
        this.setBounce(0.2)
        this.scene.physics.world.enableBody(this, 0);
    }

    fire(x, y){
        this.body.setAllowGravity(false)
        this.body.reset(x, y)
        this.setActive(true)
        this.setVisible(true)
        this.setVelocityX(700)
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

class Bullets extends Phaser.Physics.Arcade.Group{

    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    constructor(scene){
        super(scene.physics.world, scene)
        this.fireTime = 100;
        this.scene = scene;
        this.createMultiple({
            frameQuantity: 100,
            key: 'laser',
            active: false,
            visible: false,
            classType: Bullet,
            setAlpha: 0.5,
        })
    }

    fireBullet(x, y){
        let bullet

        if(this.scene.time.now > this.fireTime){
            bullet = this.getFirstDead(false)
        }

        if(bullet){
            bullet.fire(x, y)
        }
    }
}