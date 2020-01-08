var loadState = {
    preload: function () {
        //Agregar texto al juego
        this.labelloading = this.game.add.text(this.game.world.centerX + 0.5, //Posicion en X
                                     this.game.world.centerY - 15 + 0.5, //Posicion en Y
                                     'cargando...', //Texto
                                     { font: '30px Arial', fill: '#fff' }); //Estilo del texto
        //Establecer el punto de anclaje en el centro
        this.labelloading.anchor.setTo(0.5, 0.5);
 
        this.preloadingborder = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 15, 'loadingborder');
        this.preloadingborder.x -= this.preloadingborder.width / 2;
        this.preloading = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 19, 'loading');
        this.preloading.x -= this.preloading.width / 2;
        //Crear la barra de carga del juego
        this.game.load.setPreloadSprite(this.preloading, 1);//Sprite, direccion(0==horizontal, 1==vertical)
 
        game.load.image('espacio', 'Recursos_Graficos/espacio_lavel1.png');
        game.load.image('botonIG', 'Recursos_Graficos/BS.png');
        game.load.image('botonPE', 'Recursos_Graficos/boton5PE.png');
        game.load.image('botonN', 'Recursos_Graficos/boton5N.png');
        game.load.image('colores', 'Recursos_Graficos/colors2.png');
        game.load.image('titulo', 'Recursos_Graficos/titulo_v1.png');
        game.load.audio('musica', ['audio/MRPEM.ogg', 'audio/MRPEM.mp3']);

         game.load.image('espacio', 'Recursos_Graficos/espacio_lavel1.png');
            
            game.load.image('bloque', 'Recursos_Graficos/piedra1Gv2.png');
            game.load.image('laser', 'Recursos_Graficos/laser.png');
            game.load.image('asteroide', 'Recursos_Graficos/asteroid1Gv2.png');
            game.load.image('asteroide_Pequeño', 'Recursos_Graficos/asteroid1P.png');
            
            game.load.spritesheet('hombreCaja', 'Recursos_Graficos/Sprite_Dr_WallaceRv2.png', 280, 360, 12);
            game.load.spritesheet('enemigo', 'Recursos_Graficos/Sprite_Enemigov2.png', 375, 350, 3);
                //objetos generadores de eventos
                    game.load.spritesheet('plataforma_Salto', 'Recursos_Graficos/placaS2.png', 300, 100, 4);
            //imagenes para el display de puntos
            game.load.image('life', 'Recursos_Graficos/lifehuman.png');
            //mejorando la carga de los recursos del juego
            game.forceSingleUpdate = true;
    },
    create: function () {
        //Generalmente llegamos a un menu
        this.game.state.start('menu');
    }
};