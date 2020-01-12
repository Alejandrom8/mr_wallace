class SpritePlayer extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, collider){
        super(scene, x, y, 'boxMan', 3)
        this.scene = scene;
        this.x = x;
        this.y = y;

        let custom_body = new Phaser.Physics.Arcade.Body(scene.physics.world, this)
        this.body = custom_body;

        this.setScale(0.17)
        this.setBounce(0.2)
        this.setCollideWorldBounds(true)

        this.scene.physics.world.enableBody(this, 0);
        this.scene.physics.add.collider(this, this.scene.worldLayer)

        this.setAnimations();
    }

    setCollisions(collisionObjects){
        collisionObjects.forEach(item => {
            this.scene.physics.add.collider(this, item)
        })
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

    isTouchingDown(){
        if(this.body.blocked.down || this.body.touching.down){
            return true;
        }
        return false;
    }
}