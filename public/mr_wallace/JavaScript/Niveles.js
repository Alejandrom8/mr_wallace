var fondo;
var Niveles = {
	preload: function(){
		game.load.image('planeta1', 'Recursos_Graficos/Objects/planeta1.png');
		game.load.image('tituloN', 'Recursos_Graficos/Objects/tituloNiveles.png');
		game.load.image('espacio', 'Recursos_Graficos/espacio_lavel1.jpg');
	},
	create: function(){
		fondo = game.add.tileSprite(0, 0, 4000, 1500, 'espacio');
		game.stage.backgroundColor = '#111';
		var tituloN = game.add.sprite(game.width/2, 50, 'tituloN');
		tituloN.anchor.setTo(0.5);
		tituloN.scale.setTo(0.5);
		tituloN.fixedToCamera = true;

		var fontStyle = {font:"40px Montserrat", fill:" #f1f1f1 ", align: "center"};
		var fontStyledatos = {font:"20px Calibri light", fill:" #f1f1f1 ", align: "center"};
		//Texto con datos del nivel 
			var planeta1 = game.add.button(game.width/4, game.height/2, 'planeta1', this.iniciarJuego, this);
			planeta1.anchor.setTo(0.5);
			planeta1.scale.setTo(0.8);

			var bar = game.add.graphics();
    		bar.beginFill(0x000000, 0.5);
    		bar.drawRect(game.width/2, game.height/2-120, 450, 350);

			var tituloPlaneta = game.add.text(game.width/2, game.height/2-200, 'Ponto', fontStyle);
			var datosPlaneta = game.add.text(game.width/2, game.height/2-100, 'El planeta ponto es en donde avita la cibilización Ive\n desde hace más de 1 millon de años, se formo a partir \nde la colision de dos planetas del mismo sistema solar', fontStyledatos);
			datosPlaneta.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
	},

	 update: function(){
	 	fondo.tilePosition.y -=0.20;
	 },
	 iniciarJuego:function(){
		// music.fadeOut(4000);
        // music.stop();
		this.state.start('juego');
	},
};