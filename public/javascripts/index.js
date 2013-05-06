require.config({
    baseUrl : "/javascripts/",
    paths : {
        jquery : 'libs/jquery/jquery-1.9.1.min',
        jquery_ui : 'libs/jquery/jquery-ui',
        underscore : 'libs/underscore/underscore',
        backbone : 'libs/backbone/backbone0.9.10',
        text : 'libs/require/text',
        openlayers: 'libs/openlayer/OpenLayers'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'openlayers': {
        	exports: 'OpenLayers'
        }
    }
});

require(['openlayers'],
    function(OpenLayers) {
    	var map;
    	map = new OpenLayers.Map('map');
    	var wms = new OpenLayers.Layer.WMS("OpenLayers WMS", "http://labs.metacarta.com/wms/vmap0",{layers: 'basic'});
    	map.addLayers([wms]);
    	map.zoomToMaxExtent();
    }
);

