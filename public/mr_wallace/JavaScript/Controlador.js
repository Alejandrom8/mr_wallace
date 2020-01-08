// JavaScript Document
var game = new Phaser.Game("100%","100%" , Phaser.CANVAS, 'game');

	game.state.add('boot', bootState);
	game.state.add('load', loadState);
	game.state.add('menu', menu);
	game.state.add('Niveles', Niveles);
	game.state.add('juego', juego);
	game.state.add('GameOver', GameOver);

	//estado de iniciacion
	game.state.start('menu');