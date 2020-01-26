class SpritePlayer extends Phaser.Physics.Arcade.Sprite{

    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(scene){
        super(scene, 0, 0, 'boxMan', 3)
        this.scene = scene;
        // this.x = x;
        // this.y = y;

        // let custom_body = new Phaser.Physics.Arcade.Body(scene.physics.world, this)
        // this.body = custom_body;

        // this.scene.physics.world.enableBody(this, 0);
        // this.scene.physics.add.collider(this, this.scene.worldLayer)

        this.setScale(0.17)
        // this.setBounce(0.2)
        // this.setOrigin(0.5,0)
        this.setOrigin(-0.2,-0.1)
        // this.setCollideWorldBounds(true)
        this.setAnimations()

        // this.scene.add.existing(this)
    }
    
    setAnimations(){
        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('boxMan', {start: 1, end: 2}),
            frameRate: 10,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('boxMan', {start: 6, end: 7}),
            frameRate: 10,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'still',
            frames: this.scene.anims.generateFrameNumbers('boxMan', {start: 4, end: 5}),
            frameRate: 0.2,
            repeat: -1
        })
    }
}