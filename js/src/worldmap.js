define(['lodash', 'provinceData', 'candy', 'province'], function(_, ProvinceData, Candy, Province){
    var worldMap = function(phaserInstance){
        this.provinces = [];
        _.each(ProvinceData, function(province){
            this.provinces.push(new Province(province, phaserInstance));
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

        this.phaserInstance.input.onDown.add(this.worldMapMouseDown, this);

        this.updateMap = true;
    };
    worldMap.prototype = {
        update: function(){
            if(this.updateMap){
                _.each(this.provinces, function(province){
                    if(province.polygon ? province.polygon.contains(this.phaserInstance.input.x, this.phaserInstance.input.y) : false){
                        //Draw fill polygon
                        console.log('drawing fill poly');
                        province.polyDrawer.beginFill(0xFFFFFF, 0.5);
                        province.polyDrawer.drawPolygon(province.polygon);
                        province.polyDrawer.endFill();
                    }
                    else{
                        //Clear polygon
                        province.polyDrawer ? province.polyDrawer.clear() : false;
                    }
                }, this);
            }
        },
        worldMapMouseDown: function(){
            var position = this.phaserInstance.input.activePointer.position;
            _.each(this.provinces, function(province){
                if(province.polygon ? province.polygon.contains(position.x, position.y): false){
                    //Transition to this province
                    this.transitionFrom(province.transitionTo, province);
                }
            }, this);
        },
        transitionFrom: function(nextTransitionDelegate, context){
            this.logo.dissapearTween.onComplete.addOnce(function(){
                nextTransitionDelegate.apply(context);
            }, this);
            this.logo.dissapearTween.start();
            this.clearMap();
            this.updateMap = false;
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
            var polygonPoints = [];
            var maxX = 0, maxY = 0;
            _.each(province.edges, function(edge){
                this.mapBmp.ctx.beginPath();
                this.mapBmp.ctx.lineWidth = edge.lineWidth;
                this.mapBmp.ctx.strokeStyle = edge.color;//'rgb(239,237,79)';
                this.mapBmp.ctx.setLineDash(edge.lineDash);//[2,3]);
                this.mapBmp.ctx.moveTo(edge.startX,edge.startY);
                this.mapBmp.ctx.lineTo(edge.endX, edge.endY);
                polygonPoints.push({x:edge.endX, y:edge.endY});
                if(edge.endX > maxX)maxX=edge.endX;
                if(edge.endY > maxY)maxY=edge.endY;
                this.mapBmp.ctx.closePath();
                this.mapBmp.ctx.stroke();
            }, this);

            province.polyDrawer = this.phaserInstance.add.graphics(0,0);
            province.polygon = new Phaser.Polygon(polygonPoints);
            province.polygonTween = this.phaserInstance.add.tween(province.polyDrawer)
                .to({x:-(maxX/2)+ 100, y:-(maxY/2)+ 100}, 1000, Phaser.Easing.Linear.None);
            province.polygonSizeTween = this.phaserInstance.add.tween(province.polyDrawer.scale)
                .to({x:2, y:2}, 1000, Phaser.Easing.Linear.None);

        },
        clearMap: function(){
            this.mapSprite.destroy();
        }
    };
    return worldMap;
});