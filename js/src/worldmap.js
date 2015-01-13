define(['lodash', 'provinceData', 'candy'], function(_, ProvinceData, Candy){
    var worldMap = function(phaserInstance){
        this.provinces = [];
        this.logo = phaserInstance.add.text(phaserInstance.world.width, 100,'PANAMANISTAN');
        Candy.setTextProps(this.logo, {fontSiez: 24,
            fill: Candy.gameBoyPalette.green,
            stroke: Candy.gameBoyPalette.lightGreen});
        this.logo.appearTween = phaserInstance.add.tween(this.logo.scale)
            .to({x:1.2, y:1.2}, 500, Phaser.Easing.Linear.None)
            .to({x:1, y:1}, 500, Phaser.Easing.Bounce.Out);
        this.logo.dissapearTween = phaserInstance.add.tween(this.logo.scale)
            .to({x:0.0001, y:0.0001}, 500, Phaser.Easing.Bounce.Out);

        this.mapBmp = phaserInstance.add.bitmapData(1024, 768);
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
            this.drawMap();
            this.logo.appearTween.start();
        },
        drawMap: function(){
            _.each(ProvinceData, function(province){
               this.drawProvince(province);
            }, this);
        },
        drawProvince: function(province){
            this.mapBmp.ctx.clear();
            this.mapBmp.canvas.width = 1024;
            this.mapBmp.canvas.height = 768;

            this.mapBmp.ctx.beginPath();
            _.each(province.edges, function(edge){
                this.mapBmp.ctx.lineWidth = edge.lineWidth;
                this.mapBmp.ctx.strokeStyle = edge.color;//'rgb(239,237,79)';
                this.mapBmp.ctx.setLineDash(edge.lineDash);//[2,3]);
                this.mapBmp.ctx.moveTo(edge.startX,edge.startY);
                this.mapBmp.ctx.lineTo(edge.endX, edge.endY);
                this.mapBmp.ctx.stroke();
            }, this);
            this.mapBmp.ctx.closePath();

            if(province.sprite)province.sprite.destroy();
            this.mapBmp.canvas.width = province.width;
            this.mapBmp.canvas.height = province.height;
            province.sprite = this.phaserInstance.add.sprite(province.centerX, province.centerY, this.mapBmp);
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