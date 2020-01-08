// JavaScript Document
var bg;
var hombre;
var controles;
var a, ap, b, b1, b1_5, b2, b3, bp1;
var Placa_salto;
var enemigos, enemigo;
var vidas = 3;
var hombreVidas;
var AudioSalto, AudioDisparo;

var bullets, direccion;
var Tiempobala = 100;
var juego = {
        preload: function () {
            //background del canvas

            game.load.tilemap('level1', 'Recursos_Graficos/Mapav1.csv');
            game.load.image('ground_1x1', 'Recursos_Graficos/mapav1.png');

            game.load.image('espacio', 'Recursos_Graficos/espacio_lavel1.jpg');
            game.load.image('closeButton', 'Recursos_Graficos/closeButton.png');
            
            game.load.image('bloque', 'Recursos_Graficos/CEM1_V1.png');
            game.load.image('laser', 'Recursos_Graficos/laser1.png');
            game.load.image('chorro', 'Recursos_Graficos/bullet206.png');
            game.load.image('asteroide', 'Recursos_Graficos/CEG1_V1.png');
            game.load.image('BloquePlano', 'Recursos_Graficos/CECH1_V1.png');
            game.load.image('asteroide_Pequeño', 'Recursos_Graficos/asteroid1P.png');
            game.load.image('boxBack', 'Recursos_Graficos/boxBack.png');
            
            game.load.spritesheet('hombreCaja', 'Recursos_Graficos/Sprite_Dr_WallaceRv2.png', 280, 360, 12);
            game.load.spritesheet('enemigo', 'Recursos_Graficos/Sprite_Enemigov2.png', 375, 350, 3);
            	//objetos generadores de eventos
					game.load.spritesheet('plataforma_Salto', 'Recursos_Graficos/placaS2.png', 300, 100, 4);
            //imagenes para el display de puntos
            game.load.image('life', 'Recursos_Graficos/lifehuman.png');
            //mejorando la carga de los recursos del juego
             game.load.audio('AudiodeFondo', 'audio/musicaFondo/Soliloquy.mp3');
             game.load.audio('salto', 'audio/EfectosSonido/Salto_2.wav');
             game.load.audio('disparo', 'audio/EfectosSonido/disparo.wav');
             game.load.audio('Pasos', 'audio/steps2.mp3');
            game.forceSingleUpdate = true;
        },

        create: function () {

            //se inician las fisicas de la libreria Phaser
                game.physics.startSystem(Phaser.Physics.ARCADE);
				game.world.setBounds(0, 0, 1500, 1500);
            //audios
            //creando objetos
                //fondo
                bg = game.add.tileSprite(0, 0, 4000, 1500, 'espacio');
               // game.stage.backgroundColor = "#271443";
               //   map = game.add.tilemap('level1', 64, 64);
               //   map.addTilesetImage('ground_1x1');
               //  layer = map.createLayer(0);
               //  layer.resizeWorld();
                //bloques para saltar
                b = game.add.sprite(300, 500, 'bloque');
                b1 = game.add.sprite(700, 450, 'bloque');
                a = game.add.sprite(1200, 400, 'asteroide');
                bp1 = game.add.sprite(2400, 500, 'BloquePlano');
                ap = game.add.sprite(3100, 350, 'asteroide_Pequeño');
                b1_5 = game.add.sprite(3400, 700, 'bloque');
                b2 = game.add.sprite(3800, 300, 'bloque');
                b3 = game.add.sprite(3500, 700, 'bloque');
			         
					//objetos generadores de eventos
					Placa_salto = game.add.sprite(400, 480, 'plataforma_Salto', 1);
				    Placa_salto.scale.setTo(0.2);
                //personajes
                    //El hombre Caja
                    hombre = game.add.sprite(game.width/2, game.height/2, 'hombreCaja', 3);
                    //enemigos
                    enemigos = game.add.group();
                    enemigos.enableBody = true;
                    enemigos.physicsBodyType = Phaser.Physics.ARCADE;
			         for (var i = 0; i < 5; i++){
                         enemigo = enemigos.create(i * (Math.random()* 3000), 400, 'enemigo');
                         //enemigo.body.collideWorldBounds = true;
                         enemigo.body.gravity.y = 1000;
                     }
            //Propiedades fisicas para cada elemento creado
            
                    //permisos para fisicas Phaser
                    game.physics.arcade.enable(hombre); game.physics.arcade.enable(Placa_salto);
                    game.physics.arcade.enable(b);      game.physics.arcade.enable(enemigos);
                    game.physics.arcade.enable(b1);     game.physics.arcade.enable(bp1);
                    game.physics.arcade.enable(b1_5);
                    game.physics.arcade.enable(b2);
                    game.physics.arcade.enable(b3);
                    game.physics.arcade.enable(a);
                    game.physics.arcade.enable(ap);

                    //game.physics.enable( [hombre, Placa_salto ], Phaser.Physics.ARCADE);
            
                    //todas las propiedades para el hombre caja
                    hombre.animations.add('izquierda', [2,1]);
                    hombre.animations.add('derecha', [7,6]);
                    hombre.animations.add('quieto', [5, 4]);
                    hombre.animations.add('SaltoD', [11]);
                    hombre.animations.add('SaltoI', [10]);
                    	hombre.anchor.setTo(0, 0.5);
                    	hombre.scale.setTo(0.17);
						hombre.smoothed = false;
                    	hombre.body.gravity.y = 1000;//gravedad para contrarrestar el salto

					 game.camera.follow(hombre, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
					//propiedades de los enemigos
            
                     enemigos.callAll('animations.add', 'animations', 'spin', [0, 1], 2, true);
                     enemigos.callAll('animations.play', 'animations', 'spin');
                     enemigos.scale.setTo(0.3);
                    // enemigos.body.gravity.y = 100;
							//animaciones de los objetos generadores de eventos
								Placa_salto.animations.add('flama', [1,2,3]);
            					Placa_salto.enableBody = false;
								Placa_salto.body.immovable = true;
                    //todos los bloques del nivel
                        //1.//bloque 1
                            b.enableBody = true;
                            b.body.immovable = true;
                        //2.//bloque 2
                            b1.enableBody = true;
                            b1.body.immovable = true;
                        //2.5.//bloque 2.5.
                            b1_5.enableBody = true;
                            b1_5.body.immovable = true;
                        //3.//bloque 3
                            b2.enableBody = true;
                            b2.body.immovable = true;
                        //4.//bloque 4
                            b3.enableBody = true;
                            b3.body.immovable = true;
                        //5.//asteroide 1 grande
                            a.enableBody = true;
                            a.body.immovable = true;
                        //6.//asteroide 1 pequeño
                            ap.enableBody = true;
                            // ap.body.immovable = true;
                        //7.//Bloque plano
                            bp1.enableBody = true;
                            bp1.body.immovable = true;
                    
                    //funcion para detectar al oprimir la barra espaciadora
                    // salto = game.input.keyboard.addKey(Phaser.Keyboard.UP);
                    // salto.onDown.add(this.saltar, this);
                    //variable para detectar cualquier tecla oprimida
                    controles = game.input.keyboard.createCursorKeys();

                    //objetos para el display de puntaje
                var life = game.add.tileSprite(game.width/1.13, 25,34,34, 'life');
                life.fixedToCamera = true;
                hombreVidas = game.add.text(game.width/1.10, 25, 'x '+ vidas, {font:"30px arial", fill:"#fff", align: "center"});
                hombreVidas.fixedToCamera = true;
                var botonPausa = this.add.button(game.width/1.05, 25, "botonP", this.pausarJuego, this);
                     botonPausa.anchor.setTo(0.5);
                     botonPausa.scale.setTo(0.1);
                     botonPausa.fixedToCamera = true;

                 game.physicsBodyType = Phaser.Physics.ARCADE;
                    bullets = game.add.group();
                    bullets.enableBody = true;
                    bullets.createMultiple(10, 'laser');
                    bullets.setAll('anchor.y', -1);
                    bullets.setAll('outOfBoundsKill', true);
                    bullets.setAll('checkWorldBounds', true);

                    AudioSalto = game.add.audio('salto');
                    AudioDisparo = game.add.audio('disparo');
                    AudioPasos = game.add.audio('Pasos');
                    AudioFondo = game.add.audio('AudiodeFondo');
                    AudioFondo.play();
                    AudioFondo.volume = 0.5;
			
        },

        update: function () {

        //puntos_vida.y = PosicionCamaraY;
        //si el heroe esta fuera del cuadro de juego, muere.
        if( hombre.inWorld == false){
            // hombre.body.collideWorldBounds = true;
            // hombre.events.onOutOfBounds.add(fuera, this);
            vidas -= 1;
            this.state.start('GameOver');
        }
        else{
            bg.tilePosition.x -=1;
			if(vidas >= 1){
            //variables y elementos que se actualizaran constantemente
                hombre.body.velocity.x = 0;
                /*x*/Placa_salto.animations.play('flama', 2, true);
            
                //anulando velocidad infinita de los bloques
                    b.body.velocity.x = 0;
                    b1.body.velocity.x = 0;
                    b1_5.body.velocity.x = 0;
                    b2.body.velocity.x = 0;
                    b3.body.velocity.x = 0;
                    a.body.velocity.x = 0;
                    ap.body.velocity.x = 0;
                    bp1.body.velocity.x = 0;
					/*x*/Placa_salto.body.velocity.x = 0;

                        //creando coliciones entre elementos
                        game.physics.arcade.collide(hombre, b);			//game.physics.arcade.collide(hombre, Placa_salto);
                        game.physics.arcade.collide(hombre, b1);       
                        game.physics.arcade.collide(hombre, b1_5);
                        game.physics.arcade.collide(hombre, b2);
                        game.physics.arcade.collide(hombre, b3);
                        game.physics.arcade.collide(hombre, a);
                        game.physics.arcade.collide(hombre, ap);
                        game.physics.arcade.collide(hombre, bp1);    

                        //game.physics.arcade.collide(hombre, Placa_salto, SuperSalto, null, this);      
        

            /**********************
            
                Derecha
                
            **********************/
                    if(controles.right.isDown ){//hombre.body.velocity.y >= 0){
                        
                        //colocando la velocidad para cada bloque para simular un progreso
                            bg.tilePosition.x -= 0.5;b.body.velocity.x = -200;b1.body.velocity.x = -200;b1_5.body.velocity.x = -200;
                            b2.body.velocity.x = -200;b3.body.velocity.x = -200;a.body.velocity.x = -200;ap.body.velocity.x = -200;
					   /*x*/Placa_salto.body.velocity.x = -200;bp1.body.velocity.x = -200;
						      
                              hombre.body.velocity.x = 250;
                              hombre.animations.play('izquierda', 10, true);

                               if(controles.right.isDown && controles.up.isDown && hombre.body.touching.down){
                                    hombre.animations.stop();
                                    hombre.body.velocity.x = 180;
                                      hombre.animations.play('SaltoD', 1, false);
                                        hombre.body.velocity.y = -500;
                                         AudioSalto.play();

                                         // game.time.events.add(Phaser.Timer.SECOND * 2, DobleSalto, this);

                                }
                        //propiedades para el hombre caja
                        // if(hombre.body.velocity.y == 0){
                        //         hombre.body.velocity.x = 250;
                        // }else{
                        //     hombre.body.velocity.x = 90;
                        //     hombre.animations.play('SaltoD', 1, false);
                        // }
                         direccion = 1;
                    }
            /**********************
            
                Izquierda
                
            **********************/
                      else if(controles.left.isDown){//&& hombre.body.velocity.y >= 0){
                        
                        //colocando la velocidad para cada bloque para simular un progreso
                            bg.tilePosition.x += 0.5;b.body.velocity.x = 200;b1.body.velocity.x = 200;b1_5.body.velocity.x = 200;
                            b2.body.velocity.x = 200;b3.body.velocity.x = 200;a.body.velocity.x = 200;ap.body.velocity.x = 200;
                            bp1.body.velocity.x = 200;
						  /*x*/Placa_salto.body.velocity.x = 200;
                          
                        //propiedades para el hombre caja
                        hombre.body.velocity.x = -250;
                        hombre.animations.play('derecha', 10, true);

                        if(controles.left.isDown && controles.up.isDown && hombre.body.touching.down){
                                    hombre.animations.stop();
                                    hombre.body.velocity.x = -180;
                                      hombre.animations.play('SaltoI', 1, false);
                                        hombre.body.velocity.y = -500;
                                         AudioSalto.play();
                                }
                        // if(hombre.body.velocity.y == 0){
                        //         hombre.body.velocity.x = -200;
                        // }else{
                        //     hombre.body.velocity.x = -90;
                        //     hombre.animations.play('SaltoI', 1, false);
                        // }
                        direccion = 0;
                    }
                    else if (controles.up.isDown && hombre.body.touching.down){
                        hombre.body.velocity.y = -280;
                         AudioSalto.play();
                    }
            /**********************
            
                Anulando efectos para cuando no haya eventos
                
            **********************/
                    else{
//                        if(hombre.body.touching.down){
 //                           var numRandom = Math.round(Math.random()*2);
   //                         if(numRandom == 1){hombre.frame = 4;}else{hombre.frame = 5;}
                            hombre.animations.play('quieto', 0.2, true);
     //                   }
                        
//                        if(this.input.keyboard.lastKey = controles.right){
//                            hombre.frame = 3;
//                        }
//                        else if(this.input.keyboard.lastKey = controles.left){
//                            hombre.frame = 1;
//                        }
                    }
            //condiciones para mantener al hombre dentro del rango de vision
//            if(hombre.position.x < 200){
//                hombre.position.x += 2;
//            }else if(hombre.position.x > 700){
//                hombre.position.x -= 2;
//            }

            
            }else{
                AudioFondo.stop();
                this.state.start('GameOver');
            }
            var bala;

                            if(controles.down.isDown){
                                        if(game.time.now > Tiempobala){
                                            bala = bullets.getFirstExists(false);
                                        }
                                        if(bala){
                                            bala.reset(hombre.x, hombre.y);
                                            bala.body.velocity.x = 450;
                                            Tiempobala = game.time.now + 100;
                                            AudioDisparo.play();
                                        }
                                }
                                
                
                            if(direccion ==  1){
                                  if(controles.down.isDown){
                                        if(game.time.now > Tiempobala){
                                            bala = bullets.getFirstExists(false);
                                        }
                                        if(bala){
                                            bala.reset(hombre.x, hombre.y);
                                            bala.body.velocity.x = 450;
                                            Tiempobala = game.time.now + 100;
                                            AudioDisparo.play();
                                        }
                                }
                                bullets.setAll('anchor.x', -0.5);
                            }
                            else if( direccion == 0){
                                if(controles.down.isDown){
                                            if(game.time.now > Tiempobala){
                                                bala = bullets.getFirstExists(false);
                                            }
                                            if(bala){
                                                bala.reset(hombre.x, hombre.y);
                                                bala.body.velocity.x = -450;
                                                Tiempobala = game.time.now + 100;
                                                AudioDisparo.play();
                                            }
                                    }
                                bullets.setAll('anchor.x', 1.5);

                            }
                
                
                    // do{
                    //     kakuna.animations.play('move', 15, true);
                    //     if(kakuna.body.touching.right){
                    //         kakuna.body.velocity.x = -200;
                    //     }
                    //     else if(kakuna.body.touching.left){
                    //         kakuna.body.velocity.x = 200;
                    //     }
                    // }while(kakuna.collideWorldBounds);
                
                
            // game.physics.arcade.overlap(bullets, enemigos, disparo);
            }
        },
//            game.add.tween(hombre).to({angle: -30}, 100).start();

            // CrearMapa: function(){
            // for(var i = 0; i <= 15; i++){

            //     var numrandom = Math.random();

            //     for (var i2 = 0; i2 <= 5; i2 * numrandom){
            //         var pos_1 = Math.random() * 960;
            //         var pos_2 = Math.random() * 640;

            //         if(i2 == 1){
            //             var bloque_RME = game.add.group();
            //             bloque_RME.reset(pos_1, pos_2);
            //             bloque_RME.enableBody = true;
            //         }else if(i2 == 2){
            //             var asteroide_CPE = game.add.sprite(pos_1, pos_2, 'asteroide_Pequeño');
            //         }else if(i2 == 3){
            //             var asteride_CGE = game.add.sprite(pos_1, pos_2, 'asteroide');
            //         }
            //     }
            // }
            // },
            // CrearAsteroide: function(x, y){
            //         var asteroide;
            //         asteriode.reset(x, y);

            //             if(hombre.body.velocity.x >= 0){
            //                 asteroide.body.velocity.x = 180;
            //             }else if(hombre.body.veocity.x <= 0){
            //                 asteroide.body.velocity.x = -180;
            //             }

            //},
            fuera: function(){
                hombre.reset(300, 300);
            },
            disparo: function(bala, enemigo){

                var cont =0;
                cont++;
                bala.kill();
                
                if(cont >= 5){
                enemigo.kill();
                }

            },
            SuperSalto: function(obj1, obj2){
                hombre.body.gravity.y = -500;
            },

            // DobleSalto: function(){
            //      game.time.events.add(Phaser.Timer.SECOND * 2, {
            //          if(controles.up.isDown){
            //             hombre.body.gravity.y -= 400;
            //          }
            //      }, this);
            // },
            pausarJuego: function(){
                 game.physics.arcade.isPaused = (game.physics.arcade.isPaused) ? false : true;
            },

};