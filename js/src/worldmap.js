define(['lodash', 'provinceData', 'candy'], function(_, ProvinceData, Candy){
    var worldMap = function(phaserInstance){
        this.provinces = [];
        _.each(ProvinceData, function(province){
            this.provinces.push(province);
        }, this);
        this.logo = phaserInstance.add.text(phaserInstance.world.width-200, 100,'PANAMANISTAN');
        this.logo.scale.x = 0.0001;
        this.logo.scale.y = 0.0001;
        Candy.setTextProps(this.logo, {fontSiez: 24,
            fill: Candy.gameBoyPalette.darkBlueGreen,
            stroke: Candy.gameBoyPalette.darkBlueGreen});
        this.logo.appearTween = phaserInstance.add.tween(this.logo.scale)
            .to({x:1.2, y:1.2}, 500, Phaser.Easing.Linear.None)
            .to({x:1, y:1}, 500, Phaser.Easing.Bounce.Out);
        this.logo.dissapearTween = phaserInstance.add.tween(this.logo.scale)
            .to({x:0.0001, y:0.0001}, 500, Phaser.Easing.Bounce.Out);

        this.phaserInstance = phaserInstance;
        this.mapBmp = this.phaserInstance.add.bitmapData(1024, 768);

    };
    worldMap.prototype = {
        update: function(){
            _.each(this.provinces, function(province){
                if(province.polygon ? province.polygon.contains(this.phaserInstance.input.x, this.phaserInstance.input.y) : false){
                    //Draw fill polygon
                    console.log('drawing fill poly' + province.polygon);
                }
                else{
                    //Clear polygon

                }
            }, this);
        },
        transitionFrom: function(){
            this.logo.dissapearTween.start();
            this.clearMap();
        },
        transtionTo: function(){
            console.log('drawing map');
            this.drawMap();
            this.logo.appearTween.start();
        },
        drawMap: function(){
            _.each(this.provinces, function(province){
               this.drawProvince(province);
            }, this);
            if(this.mapSprite) this.mapSprite.destroy();
            this.mapSprite = this.phaserInstance.add.sprite(0,0,this.mapBmp);
        },
        drawProvince: function(province){
            this.mapBmp.ctx.beginPath();
            var polygonPoints = [];
            _.each(province.edges, function(edge){
                this.mapBmp.ctx.lineWidth = edge.lineWidth;
                this.mapBmp.ctx.strokeStyle = edge.color;//'rgb(239,237,79)';
                this.mapBmp.ctx.setLineDash(edge.lineDash);//[2,3]);
                this.mapBmp.ctx.moveTo(edge.startX,edge.startY);
                this.mapBmp.ctx.lineTo(edge.endX, edge.endY);
                polygonPoints.push({x:edge.endX, y:edge.endY});
            }, this);
            province.polygon = new Phaser.Polygon(polygonPoints);
            this.mapBmp.ctx.closePath();
            this.mapBmp.ctx.stroke();
        },
        clearMap: function(){
            _.each(ProvinceData, function(province){
                if(province.sprite) province.sprite.destroy();
            }, this);
        }
    };
    return worldMap;
});