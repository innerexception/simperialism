define(['phaser', 'lodash', 'candy', 'worldmap'], function(Phaser, _, Candy, WorldMap){

    //Shitty Globals for Google WebFonts
    //  The Google WebFont Loader will look for this object, so create it before loading the script.
    WebFontConfig = {
        //  'active' means all requested fonts have finished loading
        //  We set a 1 second delay before calling 'createText'.
        //  For some reason if we don't the browser cannot render the text the first time it's created.
        active: function () {
            window.setTimeout(function(){window.fontLibraryReady = true; console.log('fonts loaded!')}, 1000);
        },

        //  The Google Fonts we want to load (specify as many as you like in the array)
        google: {
            families: ['Press Start 2P']
        }
    };

    var SimperialismApp = function(h, w, mode, targetElement){
        this.gameInstance = new Phaser.Game(h, w, mode, targetElement,{
            preload: this.preload,
            create: this.load,
            update: this.update
        });
    };

    SimperialismApp.prototype = {

        preload: function () {
            //Load all assets here
            //this.gameInstance.load.image('target', 'res/sprite/target.png');
            //this.gameInstance.load.spritesheet('torso', 'res/img/torso2.png', 32, 32);
            //  Load the Google WebFont Loader script
            this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        },

        load: function () {
            //1st time load
            this.world.setBounds(0, 0, 1024, 768);
            this.worldMap = new WorldMap(this);

            //Base sprite
            this.groundSprite = this.add.sprite(0, 0, 'board');
            this.groundSprite.alpha = 0;
            this.groundSprite.fadeIn = this.add.tween(this.groundSprite)
                .to({alpha: 0.75}, 2000, Phaser.Easing.Linear.None);
            this.groundSprite.fadeIn.onComplete.addOnce(function () {
                this.inGame = true;
                this.worldMap.transtionTo();
            }, this);

            //Keyboard init
            //this.cursors = this.gameInstance.input.keyboard.createCursorKeys();

            //Camera init
            this.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
            var that = this;
            this.fontInterval = window.setInterval(function(){
                that.setUpIntro();
            }, 500);
        },

        update: function () {
            if (this.worldMap) this.worldMap.update();
        },

        setUpIntro: function () {
            window.clearInterval(this.fontInterval);
            Candy.drawIntro(this.gameInstance);
            this.camera.focusOnXY(0, 0);
            this.input.onDown.add(this.startNewGame(), this);
        },

        startNewGame: function () {
            Candy.clearIntro(this.gameInstance);
            this.groundSprite.fadeIn.start();
        },

        runVictory: function () {

        },

        runLoss: function () {

        }
    };

    return SimperialismApp;
});

