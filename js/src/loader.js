require.config({
    baseUrl: 'js',
    paths:{
        'phaser': 'lib/phaser',
        'lodash': 'lib/lodash.min',
        'candy': 'lib/candy',
        'simperialismApp': 'src/game',
        'worldmap': 'src/worldmap',
        'provinceData': 'src/provinceData'
    },
    shim: {
        'phaser': {
            exports: 'Phaser'
        }
    }
});

require(['phaser', 'simperialismApp'], function(Phaser, SimperialismApp){
    new SimperialismApp(1024, 768, Phaser.AUTO, 'appRoot');
});





