define(['lodash', 'provinceData', 'candy'], function(_, ProvinceData, Candy){
    var worldMap = function(phaserInstance){
        this.provinces = [];
        this.logo = phaserInstance.add.text(phaserInstance.world.width-200, 100,'PANAMANISTAN');
        this.logo.scale.x = 0.0001;
        this.logo.scale.y = 0.0001;
        Candy.setTextProps(this.logo, {fontSiez: 24,
            fill: Candy.gameBoyPalette.darkBlueGreen,
            stroke: Candy.gameBoyPalette.lightGreen});
        this.logo.appearTween = phaserInstance.add.tween(this.logo.scale)
            .to({x:1.2, y:1.2}, 500, Phaser.Easing.Linear.None)
            .to({x:1, y:1}, 500, Phaser.Easing.Bounce.Out);
        this.logo.dissapearTween = phaserInstance.add.tween(this.logo.scale)
            .to({x:0.0001, y:0.0001}, 500, Phaser.Easing.Bounce.Out);

        this.phaserInstance = phaserInstance;
    };
    worldMap.prototype = {
        update: function(){
            _.each(this.provinces, function(province){
                province.update();
            });
        },
        transitionFrom: function(){
            this.logo.dissapearTween.start();
            this.clearMap();
        },
        transtionTo: function(){
            console.log('drawing map');
            //Candy.drawBannerMessage(this.phaserInstance, 'JOKES', 18);
            this.drawMap();
            this.logo.appearTween.start();
        },
        drawMap: function(){
            _.each(ProvinceData, function(province){
               this.drawProvince(province);
            }, this);
        },
        drawProvince: function(province){
            var mapBmp = this.phaserInstance.add.bitmapData(province.width, province.height);
            mapBmp.ctx.beginPath();
            _.each(province.edges, function(edge){
                mapBmp.ctx.lineWidth = edge.lineWidth;
                mapBmp.ctx.strokeStyle = edge.color;//'rgb(239,237,79)';
                mapBmp.ctx.setLineDash(edge.lineDash);//[2,3]);
                mapBmp.ctx.moveTo(edge.startX,edge.startY);
                mapBmp.ctx.lineTo(edge.endX, edge.endY);
            }, this);
            mapBmp.ctx.closePath();
            mapBmp.ctx.stroke();

            if(province.sprite)province.sprite.destroy();
            province.sprite = this.phaserInstance.add.sprite(province.centerX, province.centerY, mapBmp);
            province.sprite.anchor.setTo(0.5);
        },
        clearMap: function(){
            _.each(ProvinceData, function(province){
                if(province.sprite) province.sprite.destroy();
            }, this);
        }
    };
    return worldMap;
});