require.config({
    baseUrl : "/javascripts/",
    paths : {
        jquery : 'libs/jquery/jquery-1.9.1.min',
        jquery_ui : 'libs/jquery/jquery-ui',
        underscore : 'libs/underscore/underscore',
        openlayers: 'libs/openlayer/OpenLayers',
        app: 'app',
        appLayers: 'app-layers'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'openlayers': {
        	exports: 'OpenLayers'
        }
    }
});

require(['app'],
    function(App) {
        App.start();
    }
);
