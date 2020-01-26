class Main extends Phaser.Scene{
    constructor(){
        super('main');
        this.startGame = this.startGame.bind(this);
    }

    startGame(){
        // this.mainMusic.stop()
        this.scene.start('game')
    }
    
    preload(){
        this.load.setBaseURL('http://192.168.1.70:2345/dr_wallace/src/assets');

        //backgrounds
        this.load.image('space', 'backgrounds/espacio_lavel1_v3.jpg');
        
        //sprites
        this.load.spritesheet('boxMan', 'sprites/Sprite_Dr_WallaceRv2.png', { frameWidth: 280, frameHeight: 360});
        
        //audio
        this.load.audio('mainMusic', 'audio/mainMusic.mp3');

        //others
		this.load.image('botonIG', 'components/BotonHistoria.png');
		this.load.image('botonP', 'components/BotonPersonajes.png');
		this.load.image('botonN', 'components/BotonNiveles.png');
		this.load.image('title', 'components/titulo.png');
        this.load.image('planet', 'sceneItems/planeta1.png');
    }

    create(){
        this.space = this.add.tileSprite(0, 0, 4000, 1500, 'space')

        const transparentWallace = this.add.sprite(0, 0, 'boxMan', 5)
        transparentWallace.setScale(4)
        transparentWallace.setAlpha(0.1)
        transparentWallace.setPosition(this.cameras.main.centerX, this.cameras.main.centerY)

        this.planet = this.add.sprite(290, 290, 'planet')
        this.planet.setPosition(this.cameras.main.centerX, this.cameras.main.centerY + 50)

        const title = this.add.sprite(508.7, 84, 'title')
        title.setScale(0.7)
        title.setPosition(this.cameras.main.centerX, 84)

        const startButton = this.add.image(365, 152.5, 'botonIG')
        startButton.setScale(0.3)
        startButton.setPosition(this.cameras.main.centerX, this.cameras.main.centerY )
        startButton.setInteractive().on('pointerdown', this.startGame)

        // this.mainMusic = this.sound.add('mainMusic')
        // this.mainMusic.play({loop: true})
    }

    update(){
        this.space.tilePositionX -= 0.2;
        this.planet.angle -= 0.05;
    }
}