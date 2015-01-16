define(['unitData'], function(UnitTypes){
   var Base = function(x,y,phaserInstance, signal, isFriendly){
       this.phaserInstance = phaserInstance;
       this.spawnSignal = signal;
       this.x = x;
       this.y = y;
       this.isFriendly = isFriendly;
       this.spawnDelay = 100;
   };

   Base.prototype = {
       update: function(){
           if(!this.sprite){
               this.sprite = this.phaserInstance.add.sprite(this.x,this.y,'base');
               this.sprite.anchor.setTo(0.5, 0.5);
               this.sprite.scale.x = 0.0001;
               this.sprite.scale.y = 0.0001;
               this.sprite.appear = this.phaserInstance.add.tween(this.sprite.scale)
                   .to({x:1, y:1}, 1000, Phaser.Easing.Bounce.Out);
               this.sprite.appear.start();
           }
           if(this.spawnDelay >= 0){
               this.spawnDelay -= 1;
           }
           else{
               console.log('spawning a dude.');
               this.spawnSignal.dispatch(this.sprite.x, this.sprite.y, UnitTypes.Intelligencia, this.isFriendly);
               this.spawnDelay = 100;
           }
       }
   };

   return Base;
});