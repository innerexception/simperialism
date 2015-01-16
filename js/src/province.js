define(['lodash', 'candy', 'unit', 'base'], function(_, Candy, Unit, Base){
   var Province = function(provinceData, phaserInstance){
       this.units = [];
       this.phaserInstance = phaserInstance;

       this.friendlyUnitsGroup = this.phaserInstance.add.group();
       this.friendlyUnitsGroup.enableBody = true;
       this.friendlyUnitsGroup.physicsBodyType = Phaser.Physics.P2JS;

       this.enemyUnitsGroup = this.phaserInstance.add.group();
       this.enemyUnitsGroup.enableBody = true;
       this.enemyUnitsGroup.physicsBodyType = Phaser.Physics.P2JS;

       this.friendlyUnitCollisionGroup = this.phaserInstance.physics.p2.createCollisionGroup();
       this.enemyUnitCollisionGroup = this.phaserInstance.physics.p2.createCollisionGroup();
       this.phaserInstance.physics.p2.updateBoundsCollisionGroup();

       this.fights = [];
       this.name = provinceData.name;
       this.edges = provinceData.edges;
       this.nameText = phaserInstance.add.text(-100, -100, provinceData.name);
       Candy.setTextProps(this.nameText, {fontSiez:24, fill:Candy.gameBoyPalette.darkBlueGreen});
       this.nameText.nameTextTween = this.phaserInstance.add.tween(this.nameText)
           .to({x:300, y:200}, 2000, Phaser.Easing.Bounce.Out)
           .to({x:305, y:205}, 2000, Phaser.Easing.Linear.None)
           .to({x:-100, y:-100}, 500, Phaser.Easing.Linear.None);
       this.nameText.nameTextTween._lastChild.onComplete.add(function(){
           this.enableUI = true;
       }, this);

       this.spawnSignal = new Phaser.Signal();
       this.spawnSignal.add(this.spawnUnit, this);
   };

   Province.prototype = {
       update: function(){
           if(this.enableUI){
               //Draw spawner controls / unique unit status / push-pull bar

               //Update bases
               this.enemyBase.update();
               this.friendlyBase.update();
           }
           _.each(this.units, function(unit){
               unit.update();
           });

           this.updateFights();

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
           this.layer = this.tileMap.createLayer('surface');
           this.phaserInstance.world.sendToBack(this.layer);

           this.enemyBase = new Base(this.phaserInstance.world.width - (this.phaserInstance.world.width/4),
               this.phaserInstance.world.height/2, this.phaserInstance, this.spawnSignal, false);
           this.friendlyBase = new Base(this.phaserInstance.world.width/4,
               this.phaserInstance.world.height/2, this.phaserInstance, this.spawnSignal, true);

           this.layer.alpha = 0;
           this.layer.resizeWorld();
           this.tileMap.setCollisionBetween(9, 11);
           this.phaserInstance.physics.p2.convertTilemap(this.tileMap, this.layer);

           var layerTween = this.phaserInstance.add.tween(this.layer)
               .to({alpha: 1}, 2000, Phaser.Easing.Linear.None);
           layerTween.start();
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
       spawnUnit: function(x, y, unitType, isFriendly){
           var unit = isFriendly ? this.friendlyUnitsGroup.create(x, y, unitType.sprite) : this.enemyUnitsGroup.create(x, y, unitType.sprite);
           unit.animations.add('left', [1,2,3], 5, true);
           unit.animations.add('right', [4,5,6], 5, true);
           unit.animations.add('up', [7,8,9], 5, true);
           unit.animations.add('down', [10,11,12], 5, true);
           unit.body.setCollisionGroup(isFriendly ? this.friendlyUnitCollisionGroup : this.enemyUnitCollisionGroup);
           var targetCollisionGroup = isFriendly ? this.enemyUnitCollisionGroup : this.friendlyUnitCollisionGroup;
           unit.body.collides(targetCollisionGroup, this.unitMeleeCollision, this);
           var newUnit = new Unit(x, y, unitType, this.phaserInstance, unit, isFriendly, targetCollisionGroup)
           this.units.push(newUnit);
           var position = this.phaserInstance.input.activePointer.position;
           newUnit.accelerateToXY(position.x, position.y, 1000);
       },
       unitMeleeCollision: function(attackerSprite, defenderSprite){
           //Put these two in the fight list so they can't collide with each other anymore
           var fight = {
               attacker:Candy.getObjectFromSprite(attackerSprite),
               defender:Candy.getObjectFromSprite(defenderSprite),
               sprite:this.phaserInstance.add.sprite(attackerSprite.x, attackerSprite.y, 'fight'),
               timeLeft: 300
           };

           fight.attacker.isFighting = true;
           fight.defender.isFighting = true;

           fight.sprite.animations.add('fight', [1,2,3],5, true);
           fight.sprite.animations.start('fight');
           this.fights.push(fight);
       },
       resetDrawingContext: function(){
           if(this.tileMap){
               this.tileMap.destroy();
               this.layer.destroy();
               this.baseLayer.destroy();
           }
       },
       updateFights: function(){
           var deleteIndexes = [];
           _.each(this.fights, function(fight){
               if(fight.timeLeft >= 0){
                   fight.timeLeft-=1;
               }
               else{
                   fight.sprite.destroy();
                   if(Math.random() * 100 > 50){
                       //Attacker wins
                       fight.attacker.isFighting = false;
                       fight.defender.die();
                       console.log('attacker won a fight.');
                   }
                   else{
                       //Defender wins
                       fight.defender.isFighting = false;
                       fight.attacker.die();
                       console.log('defender won a fight.');
                   }
                   deleteIndexes.push(this.fights.indexOf(fight));
               }
           }, this);
           _.each(deleteIndexes, function(index){
               console.log('garbage collecting a fight.');
               this.fights = this.fights.splice(index, 1);
           },this);
       }
   };

   return Province;
});