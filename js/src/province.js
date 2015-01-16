define(['candy'], function(Candy){
   var Province = function(provinceData, phaserInstance){
       this.name = provinceData.name;
       this.edges = provinceData.edges;
       this.phaserInstance = phaserInstance;
       this.nameText = phaserInstance.add.text(-100, -100, provinceData.name);
       Candy.setTextProps(this.nameText, {fontSiez:24, fill:Candy.gameBoyPalette.darkBlueGreen});
       this.nameText.nameTextTween = this.phaserInstance.add.tween(this.nameText)
           .to({x:300, y:200}, 2000, Phaser.Easing.Bounce.Out)
           .to({x:305, y:205}, 2000, Phaser.Easing.Linear.None)
           .to({x:-100, y:-100}, 500, Phaser.Easing.Linear.None);
       this.nameText.nameTextTween._lastChild.onComplete.add(function(){
           this.enableUI = true;
       }, this);
   };

   Province.prototype = {
       update: function(){
           if(this.enableUI){
               //Draw spawner controls / unique unit status / push-pull bar

           }
       },
       transitionTo: function(){
           this.polyDrawer.beginFill(0xFFFFFF, 0.5);
           this.polyDrawer.drawPolygon(this.polygon);
           this.phaserInstance.world.bringToTop(this.nameText);
           this.polygonTween.start();
           this.polygonSizeTween.start();
           this.nameText.nameTextTween.start();
           this.createSurfaceView();
       },
       createSurfaceView: function(){
           this.resetDrawingContext();

           this.tileMap = this.phaserInstance.add.tilemap(this.name+'_map');
           this.tileMap.addTilesetImage('surface_plains', 'surface_plains');
           this.tileMap.addTilesetImage('base', 'base');
           this.layer = this.tileMap.createLayer('surface');
           this.phaserInstance.world.sendToBack(this.layer);

           this.layer.alpha = 0;
           this.baseLayer = this.tileMap.createLayer('doodads');
           this.baseLayer.alpha = 0;
           this.layer.resizeWorld();
           this.tileMap.setCollisionBetween(9, 11);
           this.phaserInstance.physics.p2.convertTilemap(this.tileMap, this.layer);

           var layerTween = this.phaserInstance.add.tween(this.layer)
               .to({alpha: 1}, 2000, Phaser.Easing.Linear.None);
           layerTween.start();

           var baseLayerTween = this.phaserInstance.add.tween(this.baseLayer)
               .to({alpha: 1}, 2000, Phaser.Easing.Linear.None);
           baseLayerTween.start();

       },
       createBaseView: function(){
           this.resetDrawingContext();

           this.tileMap = this.phaserInstance.add.tilemap('base_map');
           this.tileMap.addTilesetImage('base_tiles', 'base_tiles');
           this.layer = this.tileMap.createLayer('base');
           this.layer.resizeWorld();
           this.tileMap.setCollision(1,2);
           this.phaserInstance.physics.p2.convertTilemap(this.tileMap, this.layer);

       },
       spawnUnit: function(x, y, unitType){
           var unit = this.phaserInstance.add.sprite(100, 200, 'intelligencia_surface_unit');
           //this.player.animations.add('left', [0, 1, 2, 3], 10, true);
           //this.player.animations.add('right', [5, 6, 7, 8], 10, true);

           this.phaserInstance.physics.p2.enable(unit);
           unit.body.fixedRotation = true;
           this.phaserInstance.camera.follow(unit);
       },
       resetDrawingContext: function(){
           if(this.tileMap){
               this.tileMap.destroy();
               this.layer.destroy();
               this.baseLayer.destroy();
           }
       }
   };

   return Province;
});