define(['openlayers', 'app-layers', 'jquery', 'jquery_ui'], function(OpenLayers, AppLayers, $, ui) {

	var obj = {
		start : function() {
			$(function() {
				$('#maps-tabs').tabs();
			});
			this.createMap('WMS');
			this.createMapWithOptions();
		},
		createMap : function(type) {
			var map;
			switch(type) {
				case 'WMS':
					map = new OpenLayers.Map('map-wms');
					var wmsLayers = AppLayers.getWMSLayers();
					map.addLayers([wmsLayers.blueMarble, wmsLayers.openStreetMap]);
					break;
			}
			map.addControl(new OpenLayers.Control.LayerSwitcher({}));
			if (!map.getCenter()) {
				map.zoomToMaxExtent();
			}
		},
		createMapWithOptions : function() {
			var geographic = new OpenLayers.Projection("EPSG:4326");
			var mercator = new OpenLayers.Projection("EPSG:900913");

			var world = new OpenLayers.Bounds(-180, -89, 180, 89).transform(geographic, mercator);
			var center = new OpenLayers.LonLat(-104.98, 39.76).transform(geographic, mercator);

			var options = {
				projection : mercator,
				units : "m",
				maxExtent : world
			};
			var map = new OpenLayers.Map("map-withOptions", options);

			var osm = new OpenLayers.Layer.OSM();
			map.addLayer(osm);

			map.setCenter(center, 9);
		}
	}
	return obj;
}); 