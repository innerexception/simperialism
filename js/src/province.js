define(['candy'], function(Candy){
   var Province = function(provinceData, phaserInstance){
       this.name = provinceData.name;
       this.edges = provinceData.edges;
       this.phaserInstance = phaserInstance;
       this.nameText = phaserInstance.add.text(-100, -100, provinceData.name);
       Candy.setTextProps(this.nameText, {fontSiez:24, fill:Candy.gameBoyPalette.darkBlueGreen});
       this.nameTextTween = this.phaserInstance.add.tween(this.nameText)
           .to({x:300, y:200}, 2000, Phaser.Easing.Bounce.Out);
   };

   Province.prototype = {
       update: function(){

       },
       transitionTo: function(){
           this.polyDrawer.beginFill(0xFFFFFF, 0.5);
           this.polyDrawer.drawPolygon(this.polygon);
           this.phaserInstance.world.bringToTop(this.nameText);
           this.polygonTween.start();
           this.polygonSizeTween.onComplete.addOnce(this.createSurfaceView, this);
           this.polygonSizeTween.start();
           this.nameTextTween.start();
       },
       createSurfaceView: function(){
           //Clean up province view extras
           this.polyDrawer.clear();
           this.polyDrawer.scale.x = 1;
           this.polyDrawer.scale.y = 1;
           this.nameText.scale.x = 0.0001;
           this.nameText.scale.y = 0.0001;

           this.resetDrawingContext();

           this.tileMap = this.phaserInstance.add.tilemap(this.name+'_map');
           this.tileMap.addTilesetImage('surface_plains', 'surface_plains');
           this.tileMap.addTilesetImage('base', 'base');
           this.layer = this.tileMap.createLayer('surface');
           this.tileMap.createLayer('doodads');
           this.layer.resizeWorld();
           this.tileMap.setCollisionBetween(9, 11);
           this.phaserInstance.physics.p2.convertTilemap(this.tileMap, this.layer);

           this.player = this.phaserInstance.add.sprite(100, 200, 'intelligencia_surface_unit');
           //this.player.animations.add('left', [0, 1, 2, 3], 10, true);
           //this.player.animations.add('turn', [4], 20, true);
           //this.player.animations.add('right', [5, 6, 7, 8], 10, true);

           this.phaserInstance.physics.p2.enable(this.player);
           this.player.body.fixedRotation = true;
           this.phaserInstance.camera.follow(this.player);
       },
       createBaseView: function(){
           this.resetDrawingContext();

           this.tileMap = this.phaserInstance.add.tilemap('base_map');
           this.tileMap.addTilesetImage('base_tiles', 'base_tiles');
           this.layer = this.tileMap.createLayer('base');
           this.layer.resizeWorld();
           this.tileMap.setCollision(1,2);
           this.phaserInstance.physics.p2.convertTilemap(this.tileMap, this.layer);

           this.player = this.phaserInstance.add.sprite(100, 200, 'intelligencia_unit_base');
           this.player.tint = Candy.gameBoyPalette.green;
           this.player.animations.add('left', [0, 1, 2, 3], 10, true);
           this.player.animations.add('turn', [4], 20, true);
           this.player.animations.add('right', [5, 6, 7, 8], 10, true);

           this.phaserInstance.physics.p2.enable(this.player);
           this.player.body.fixedRotation = true;
           this.phaserInstance.camera.follow(this.player);
       },
       resetDrawingContext: function(){
           if(this.tileMap){
               this.tileMap.destroy();
               this.layer.destroy();
               this.player.destroy();
           }
       }
   };

   return Province;
});