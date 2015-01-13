define(['phaser', 'lodash', 'candy'], function(Phaser, _, Candy){

    var SimSovietApp = function(h, w, mode, targetElement){
        this.gameInstance = new Phaser.Game(h, w, mode, targetElement,{
            preload: SimSovietApp.preload,
            create: SimSovietApp.load,
            update: SimSovietApp.update,
            render: SimSovietApp.render
        });
    };

    SimSovietApp.prototype = {

        preload: function () {
            //Load all assets here
            //this.gameInstance.load.image('target', 'res/sprite/target.png');
            //this.gameInstance.load.spritesheet('torso', 'res/img/torso2.png', 32, 32);
            //  Load the Google WebFont Loader script
            this.gameInstance.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        },

        load: function () {
            //1st time load
            this.gameInstance.world.setBounds(0, 0, 1024, 768);

            //Base sprite
            this.groundSprite = this.gameInstance.add.sprite(0, 0, 'board');
            this.groundSprite.alpha = 0;
            this.groundSprite.fadeIn = this.gameInstance.add.tween(this.groundSprite)
                .to({alpha: 0.75}, 2000, Phaser.Easing.Linear.None);
            this.groundSprite.fadeIn.onComplete.addOnce(function () {
                this.board = new Board(this.gameInstance);
                this.inGame = true;
            }, this);

            //Keyboard init
            //this.cursors = this.gameInstance.input.keyboard.createCursorKeys();

            //Camera init
            this.gameInstance.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
            this.setUpIntro();
        },

        update: function () {
            if (this.board) this.board.update();
        },

        setUpIntro: function () {
            Candy.drawIntro(this.gameInstance);
            this.gameInstance.camera.focusOnXY(0, 0);
            this.gameInstance.input.onDown.add(this.startNewGame(), this);
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

    return SimSovietApp;
});

