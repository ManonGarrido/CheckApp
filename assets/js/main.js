require.config({
    paths: {
        jquery: 'vendor/jquery/jquery', //-> vendor/jquery/jquery.js
        underscore: 'vendor/underscore/underscore',
        backbone: 'vendor/backbone/backbone',
        text: 'vendor/requirejs/text',
        async:'vendor/requirejs/async',
        geoloc:'tools/geoloc'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            export: 'Backbone'
        },
        'underscore': {
            export: '_'
        },
        'jquery': {
            export:'$'
        },
        'async': {
            export: 'async'
        },
        'geoloc':{
            export: 'geoloc'
        }
    },
    urlArgs: '_=' + (new Date()).getTime()
});

require(
    [
        'app'
    ], function(App) {
    	App.initialize();
});