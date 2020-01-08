// JavaScript Document
var fondo
var hombreCaja;
var size = 2;
var GameOver = {

	preload: function(){
		game.stage.backgroundColor = "#000";
		game.load.image('BotonReStart', 'Recursos_Graficos/BotonReStart.png');
		game.load.image('BotonMenu', 'Recursos_Graficos/BotonMenu.png');
		game.load.image('TituloGO', 'Recursos_Graficos/TituloGO.png');
		game.load.image('espacio', 'Recursos_Graficos/espacio_lavel1.png');
		game.load.spritesheet('hombreCaja', 'Recursos_Graficos/Sprite_Dr_WallaceRv2.png', 280, 360, 12);
	},
	create: function(){
		// var TextGameOver = game.add.text(game.width/2, game.height/2-100, "Game Over", {font:"100px arcade", fill:"#fff", align: "center"});
		// TextGameOver.anchor.setTo(0.5);
		fondo = game.add.tileSprite(0, 0, 1450, 800, 'espacio');
		var TituloGO = game.add.sprite(game.width/2, 200, 'TituloGO');
		TituloGO.scale.setTo(0.5);
		TituloGO.anchor.setTo(0.5);
		var botonStart = this.add.button(game.width/2, game.height/2, "BotonReStart", this.iniciarJuego, this);
		botonStart.anchor.setTo(0.5);
		botonStart.scale.setTo(0.3);
		var botonMenu = this.add.button(game.width/2, game.height/2+100, "BotonMenu", this.GotoMenu, this);
		botonMenu.anchor.setTo(0.5);
		botonMenu.scale.setTo(0.3);

		// game.time.events.add(Phaser.Timer.SECOND * 5, CaminataEspacial);

		// TextGameOver.fadeIn(2000);
	},
	update: function(){
		fondo.tilePosition.x +=0.20;
		 // hombreCaja.body.velocity.x = -200;
   //      hombreCaja.angle += 4;
   //      hombreCaja.scale.setTo(size);
   //      if(size >= 0){
   //      size -= 0.01;
   //  }
	},
	iniciarJuego:function(){
		this.state.start('juego');
//        music.fadeIn(4000);
//        music.stop();
	},
	GotoMenu: function(){
		this.state.start('menu');
	},
	// CaminataEspacial: function(){
	// 	game.physics.startSystem(Phaser.Physics.ARCADE);
	// 	hombreCaja = game.add.sprite(game.world.randomX, game.world.randomY, 'hombreCaja', 3);
	// 	hombreCaja.anchor.setTo(0.5);
	// 	game.physics.arcade.enable(hombreCaja);
	// },
};