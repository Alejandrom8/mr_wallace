class ContainerPlayer extends Phaser.GameObjects.Container{
    constructor(scene, x, y, {nickname = '', bullets = 0} = {}){
        super(scene, x, y);
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.nickname = this.scene.add.text(0, 0, nickname, {fontFamily: 'Courier'});
        const textWidth = this.nickname.width;
        const containerWidth = this.width;
        let finalCut = 0;

        if(textWidth > containerWidth){
            let surplus = containerWidth - textWidth;
            finalCut = surplus / 2;
            finalCut = finalCut * 0.25 / surplus;
        }

        this.nickname.setOrigin(finalCut,1.2)

        this.spritePlayer = new SpritePlayer(this.scene);

        this.add([this.nickname,this.spritePlayer]);

        let custom_body = new Phaser.Physics.Arcade.Body(this.scene.physics.world, this)
        this.body = custom_body;
        this.scene.physics.world.enableBody(this, 0);
        this.scene.physics.add.collider(this, this.scene.worldLayer)


        // this.scene.physics.world.enableBody(this.spritePlayer, 0);
        // this.scene.physics.add.collider(this.spritePlayer, this.scene.worldLayer)

        this.scene.add.existing(this);
    }

    isTouchingDown(){
        if(this.body.blocked.down || this.body.touching.down){
            return true;
        }
        return false;
    }
}