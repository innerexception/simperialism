define(['candy'], function(Candy){
   var Unit = function(x, y, unitData, phaserInstance, sprite, isFriendly, bulletCollisionGroup){
       this.unitData = unitData;
       this.isFriendly = isFriendly;
       this.bulletCollisionGroup = bulletCollisionGroup;
       this.isFighting = false;
       this.sprite = sprite;
       this.phaserInstance = phaserInstance;
       if(unitData.type === 'military'){
           this.bullets = this.phaserInstance.add.group();
           this.bullets.enableBody();
           this.bullets.physicsBodyType = Phaser.Physics.P2JS;
       }
   };

   Unit.prototype = {
       update: function() {
           if(!this.isFighting){
               if (this.bullets) {
                   if (this.bulletInterval <= 0) {
                       //Fire gun, reset cooldown
                       this.bulletInterval = 600;
                   }
                   else{
                       this.bulletInterval -= 1;
                   }
                   this.bullets.collides(this.bulletCollisionGroup, this.unitBulletCollision, this);
               }
               //Run unit AI:
               //Move towards enemy if in sight range
               //Otherwise move aimlessly
               //Unless near unique unit, then stay near him until dismissed
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
           this.sprite.kill();
           var that = this;
           window.setTimeout(function(){
               that.sprite.destroy();
           }, 30000);
       },
       accelerateToXY: function(x, y, speed) {
           if (!speed) {
               speed = 60;
           }
           var angle = Math.atan2(y - this.sprite.y, x - this.sprite.x);
           //this.sprite.body.rotation = this.isFriendly ? 0 : this.phaserInstance.math.degToRad(180);  // correct angle of angry bullets (depends on the sprite used)
           this.sprite.body.force.x = Math.cos(angle) * speed;    // accelerateToObject
           this.sprite.body.force.y = Math.sin(angle) * speed;
       }
   };

   return Unit;
});