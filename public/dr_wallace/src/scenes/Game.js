/**
 * @type { Game }
 * @extends {Phaser.Scene}
 */
class Game extends Phaser.Scene{
    constructor(){
        super('game');
    }

    init(){
        this.player = new Player(
            this,
            window.innerWidth / 2 + (-(Math.floor(Math.random() * 200)) + Math.floor(Math.random() * 200)), 
            200
        )
        this.input.keyboard.removeAllListeners();
    }

    preload(){
        this.load.setBaseURL('http://192.168.1.70:2345/dr_wallace/src/assets');

        //Sprites
        this.load.spritesheet('boxMan', 'sprites/Sprite_Dr_Wallace_Weapon.png', { frameWidth: 140, frameHeight: 177});
        this.load.image('laser', 'spriteAdds/laser_1.png');

        //Weapons
        this.load.image('laser_weapon', 'spriteAdds/weapons/default_1.png');

        //other objects
        this.load.image('space', 'backgrounds/espacio_lavel1_v3.jpg');
        this.load.image('tileset', 'maps/level_1/level_1_stylesheet.png')
        this.load.tilemapTiledJSON('platforms', 'maps/level_1/level_1_v2.json')
    }

    create(){
        //controls
        this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        this.cameras.main.setBounds(0, 0, this.game.canvas.width * 10, this.game.canvas.height + 200)
        this.physics.world.setBounds(0, 0, this.game.canvas.width * 10, 1500)

        this.space = this.add.tileSprite(0, 0, 16000, 1700, 'space')

        const platforms = this.make.tilemap({key:'platforms'})
        const tileset = platforms.addTilesetImage('level_1_stylesheet_v2', 'tileset')

        this.worldLayer = platforms.createDynamicLayer('Capa de patrones 1', tileset, 0, 0);
        this.worldLayer.setScale(0.8)
        this.worldLayer.setCollisionByProperty({collides: true}, true)

        this.userIteractions = this.input.keyboard.createCursorKeys();

        this.player.create();

        this.input.keyboard.on('keyup', (event) => {
            if(event.keyCode == 37 || event.keyCode == 39){
                this.player.stopWalk()
            }
        })
    }

    update(){

        this.space.tilePositionX -= 0.2;

        if(this.input.activePointer.isDown){
            const pointerDirection = this.input.activePointer.x;
            const playerPosition = this.player.getCoordinates();
            const direction = pointerDirection > playerPosition.x ? 'right' : 'left';
            this.player.shot(direction);
        }

        if(window.IS_TOUCH){
            //do something for toucheable devices
        }else{
            if(this.keyRight.isDown){
                this.player.walkRight();
                if(this.keyUp.isDown){
                    this.player.jump();
                }
            }else if(this.keyLeft.isDown){
                this.player.walkLeft();
                if(this.keyUp.isDown){
                    this.player.jump();
                }
            }else if(this.keyUp.isDown){
                this.player.jump();
            }
        }
    }
}