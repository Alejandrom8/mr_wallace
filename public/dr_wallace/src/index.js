var config = {
    type: Phaser.AUTO,
    scale: {
        // mode: Phaser.Scale.FIT,
        // autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth - 2.5,
        height: window.innerHeight - 2.2
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y:900 },
            debug: false
        }
    },
    scene: [Boot, Main, Game]
};

var game = new Phaser.Game(config);