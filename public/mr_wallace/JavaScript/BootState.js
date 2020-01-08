var bootState = {
    preload: function () {
        //Color de fondo, por defecto es negro
        //this.game.stage.backgroundColor = 'black';
        this.game.load.image('loading', 'Recursos_Graficos/loading.png');//http://www.nicholls.co/ninjadev/assets/loading.png
        this.game.load.image('loadingborder', 'Recursos_Graficos/loadingborder.png');//http://www.nicholls.co/ninjadev/assets/loadingborder.png
    },
    create: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = 240;//Ancho minimo
        this.scale.minHeight = 170;//Altura minimo
        this.scale.maxWidth = 2880;//Ancho maximo
        this.scale.maxHeight = 1920;//Altura maxima
        //Alinear el juego horizontalmente
        this.scale.pageAlignHorizontally = true;
        //Se escala de manera automatica
        this.scale.setScreenSize(true);
        //Se inicializa el estado de carga de archivos
        this.game.state.start('load');
    }
};