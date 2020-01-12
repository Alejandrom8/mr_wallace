class Boot extends Phaser.Scene{
    constructor(){
        super('bootLoader');
    }

    create(){
        this.add.text(20, 20, 'Loading game...');
        this.scene.start('main');
    }
}