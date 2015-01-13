require.config({
    baseUrl: 'js',
    paths:{
        'phaser': 'lib/phaser',
        'lodash': 'lib/lodash.min',
        'candy': 'lib/candy',
        'simSovietApp': 'src/game'

    },
    shim: {
        'phaser': {
            exports: 'Phaser'
        }
    }
});

require(['phaser', 'simSovietApp'], function(Phaser, SimSovietApp){

    //Shitty Globals for Google WebFonts
    //  The Google WebFont Loader will look for this object, so create it before loading the script.
    var WebFontConfig = {
        //  'active' means all requested fonts have finished loading
        //  We set a 1 second delay before calling 'createText'.
        //  For some reason if we don't the browser cannot render the text the first time it's created.
        active: function () {
            window.setTimeout(fontLibraryReady, 1000);
        },

        //  The Google Fonts we want to load (specify as many as you like in the array)
        google: {
            families: ['Press Start 2P']
        }
    };

    var fontLibraryReady = function(){
        new SimSovietApp(1024, 768, Phaser.AUTO, 'appRoot');
    }
});





