// JavaScript Document
var fondo;
var hombreCaja, planeta, hombreCaja;
var size = 2;
var music;
var menu = {
    
    
	preload: function(){
		game.stage.backgroundColor = "#111";
		game.load.image('espacio', '/mr_wallace/Recursos_Graficos/espacio_lavel1_v3.jpg');
		game.load.image('botonIG', '/mr_wallace/Recursos_Graficos/BotonHistoria.png');
		game.load.image('botonP', '/mr_wallace/Recursos_Graficos/BotonPersonajes.png');
		game.load.image('botonN', '/mr_wallace/Recursos_Graficos/BotonNiveles.png');
		game.load.image('colores', '/mr_wallace/Recursos_Graficos/colors2.png');
		game.load.image('titulo', '/mr_wallace/Recursos_Graficos/Objects/titulo.png');
		game.load.image('planeta', '/mr_wallace/Recursos_Graficos/Objects/planeta1.png');
		game.load.spritesheet('hombreCaja', '/mr_wallace/Recursos_Graficos/Sprite_Dr_WallaceRv2.png', 280, 360, 12);

		// game.load.audio('musica', 'audio/musicaFondo/Soliloquy.mp3');
		game.load.audio('musica', '/mr_wallace/audio/mainMusic.mp3');
	},
	create:function(){
		// game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.startSystem(Phaser.Physics.ARCADE);
		fondo = game.add.tileSprite(0, 0, 4000, 1500, 'espacio');
		// fondo.scale.setTo(1.4);
		hombreCaja = game.add.sprite(game.width/2, game.height/2, 'hombreCaja', 5);
		hombreCaja.anchor.setTo(0.5);
		hombreCaja.scale.setTo(4);
		hombreCaja.alpha = 0.1;

		planeta = game.add.sprite(game.width/2, game.height/2+game.height/10, 'planeta');
		planeta.anchor.setTo(0.5);
		var titulo = game.add.sprite(game.width/2, game.height/6, 'titulo');
		titulo.anchor.setTo(0.5);
		titulo.scale.setTo(0.7);

		hombreCajaVolador = game.add.sprite(game.world.randomX, game.world.randomY, 'hombreCaja', 3);
		 hombreCajaVolador.anchor.setTo(0.5);
		 game.physics.arcade.enable(hombreCajaVolador);

		// var colors = game.add.tileSprite(-500,0, 1850, 500, 'colores');
		var botonStart = this.add.button(game.width/2, game.height/2, "botonIG", this.iniciarJuego, this);
		botonStart.anchor.setTo(0.5);
		botonStart.scale.setTo(0.3);
		var botonNiveles = this.add.button(game.width/2, game.height/2+100, "botonN", this.iniciarNiveles, this);
		botonNiveles.anchor.setTo(0.5);
		botonNiveles.scale.setTo(0.3);
		var botonPersonajes = this.add.button(game.width/2, game.height/2+200, "botonP", this.iniciarJuego, this);
		botonPersonajes.anchor.setTo(0.5);
		botonPersonajes.scale.setTo(0.3);

		var texto_inicial = game.add.text(game.width/2, game.height/3.35, 'Creado por Alejandro Gómez García', {font:"15px Arial", fill:" #f1f1f1 ", align: "center"});
		texto_inicial.anchor.setTo(0.5);
    music = game.add.audio('musica');

    music.play();
    music.loopFull();
	},
    update:function (){

        fondo.tilePosition.x -=0.20;
         hombreCajaVolador.body.velocity.x = -200;
    //      hombreCaja.body.rotateLeft(5);
         hombreCajaVolador.angle += 3;
   		     planeta.angle -= 0.2;
         hombreCajaVolador.scale.setTo(size);
         if(size >= 0){
         size -= 0.01;
     }

    },
	iniciarJuego:function(){
		 // music.fadeOut(4000);
         music.stop();
		this.state.start('juego');
	},
	iniciarNiveles:function(){
		this.state.start('Niveles');
	},
 // 	render: function() {
 //     game.debug.soundInfo(music, 20, 32);
 // }
	
};