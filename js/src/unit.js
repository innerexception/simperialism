define(['candy'], function(Candy){
   var Unit = function(x, y, unitData, phaserInstance, sprite, isFriendly, bulletCollisionGroup){
       this.unitData = unitData;
       this.isFriendly = isFriendly;
       this.bulletCollisionGroup = bulletCollisionGroup;
       this.isFighting = false;
       this.isTweening = true;
       this.sprite = sprite;
       this.sightBox = phaserInstance.add.sprite(this.sprite.x, this.sprite.y, 'sightBox');
       phaserInstance.physics.enable(this.sightBox, Phaser.Physics.ARCADE);
       this.phaserInstance = phaserInstance;
       if(unitData.type === 'military'){
           this.bullets = this.phaserInstance.add.group();
           this.bullets.enableBody();
           this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
       }
       this.sprite.spawnTween = this.phaserInstance.add.tween(this.sprite)
           .to({x:this.sprite.x-10, y:this.sprite.y + 40}, 1000, Phaser.Easing.Linear.None);
       this.sprite.spawnTween.onComplete.add(function(){this.isTweening = false;}, this);
       this.sprite.spawnTween.start();
   };

   Unit.prototype = {
       update: function() {

           if(!this.isFighting && !this.isTweening){
               if (this.bullets) {
                   if (this.bulletInterval <= 0) {
                       //Fire gun, reset cooldown
                       this.bulletInterval = 600;
                   }
                   else{
                       this.bulletInterval -= 1;
                   }
                   this.phaserInstance.physics.arcade.overlap(this.bullets, this.bulletCollisionGroup, this.unitBulletCollision, null, this);
               }
               //Run unit AI:
               //move aimlessly
               //Move towards enemy if in sight range
               //Unless near unique unit under orders, then stay near him until dismissed
               if(!this.isLeader){
                   if(this.leader){
                       this.followLeader();
                   }
                   else if(this.phaserInstance.physics.arcade.overlap(this.bulletCollisionGroup, this.sightBox, this.accelerateToEnemy, null, this)){
                   }
                   else{
                       this.wander();
                   }
                   this.sightBox.x = this.sprite.x;
                   this.sightBox.y = this.sprite.y;

                   if(this.sprite.body.velocity.x > 0){
                       if(this.sprite.body.velocity.y < 20 && this.sprite.body.velocity.y > 0){
                           this.sprite.animations.play('right');
                       }
                       else if(this.sprite.body.velocity.y > 20){
                           this.sprite.animations.play('down');
                       }
                       else if(this.sprite.body.velocity.y < -20){
                           this.sprite.animations.play('up');
                       }
                   }
                   else{
                       if(this.sprite.body.velocity.y < 20 && this.sprite.body.velocity.y > 0){
                           this.sprite.animations.play('left');
                       }
                       else if(this.sprite.body.velocity.y > 20){
                           this.sprite.animations.play('down');
                       }
                       else if(this.sprite.body.velocity.y < -20){
                           this.sprite.animations.play('up');
                       }
                   }
               }
               else{
                   this.sprite.scale.x = 2;
                   this.sprite.scale.y = 2;
                   if(this.phaserInstance.input.mousePointer.isDown){
                       this.phaserInstance.physics.arcade.accelerateToPointer(this.sprite, null, 100,100,100);
                   }
               }

           }

       },
       unitBulletCollision: function(bulletSprite, unitSprite) {
           var unit = Candy.getObjectFromSprite(unitSprite);
           if (unit)unit.die();
           bulletSprite.destroy();
       },
       die: function(){
           //U dead. Bodies stay for 30 secs
           this.sprite.animations.play('die');
           var that = this;
           window.setTimeout(function(){
               console.log('removing a body');
               that.sprite.kill();
               that.sprite.destroy();
               delete that.sprite;
           }, 30000);
       },
       accelerateToEnemy: function(thisSprite, bulletSprite){
           //console.log('near some asshole.');
           this.phaserInstance.physics.arcade.accelerateToObject(this.sprite, bulletSprite, 60, 60,60);
       },
       wander: function(){
            if(this.directionTimer >=0){
                this.directionTimer -= 1;
            }
           else{
                this.directionTimer = 100;
                this.phaserInstance.physics.arcade.accelerateToXY(this.sprite, Math.random()*this.phaserInstance.world.width,
                    Math.random()*this.phaserInstance.world.height, 30, 30, 30);
            }
       },
       followLeader: function(){
           if(this.leader && !this.leader.isFighting){
               console.log('following some asshole');
               this.phaserInstance.physics.arcade.accelerateToObject(this.sprite, this.leader.sprite, 30, 30, 30);
           }
       }
   };

   return Unit;
});