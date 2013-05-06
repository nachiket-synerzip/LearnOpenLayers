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
    	//var wms = new OpenLayers.Layer.WMS("OpenLayers WMS", "http://labs.metacarta.com/wms/vmap0",{layers: 'basic'});
    	var wms_layer_map = new OpenLayers.Layer.WMS(
			'Base layer',
			'http://vmap0.tiles.osgeo.org/wms/vmap0',
			{layers: 'basic'},
			{isBaseLayer: true}
		);
		var wms_layer_labels = new OpenLayers.Layer.WMS(
			'Location Labels',
			'http://vmap0.tiles.osgeo.org/wms/vmap0',
			{layers: 'clabel,ctylabel,statelabel',
			transparent: true},
			{opacity: .5}
		);
    	map.addLayers([wms_layer_map, wms_layer_labels]);
    	map.addControl(new OpenLayers.Control.LayerSwitcher({}));
    	if(!map.getCenter()){
    		map.zoomToMaxExtent();
		}
    }
);

