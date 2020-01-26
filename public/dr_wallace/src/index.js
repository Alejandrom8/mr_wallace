var config = {
    parent: 'game',
    type: Phaser.AUTO,
    scale: {
        // mode: Phaser.Scale.FIT,
        // autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth - 3,
        height: window.innerHeight - 4.01
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y:900 },
            debug: true
        }
    },
    scene: [Boot, Main, Game]
};
let game;

function initGame(){
    game = new Phaser.Game(config);
}