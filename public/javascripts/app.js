define(['openlayers', 'app-layers', 'jquery', 'jquery_ui'], function(OpenLayers, AppLayers, $, ui) {

	var obj = {
		start : function() {
			$(function() {
				$('#maps-tabs').tabs();
			});
			this.createWMSMap('WMS');
			this.createMapWithOptions();
			this.createEarthquakeLayer();
		},
		createWMSMap : function(type) {
			var map = new OpenLayers.Map('map-wms');
			var wmsLayers = AppLayers.getWMSLayers();
			map.addLayers([wmsLayers.blueMarble, wmsLayers.openStreetMap]);
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
			var bing = new OpenLayers.Layer.Bing({
                key: "AlucD6JGAHASammfZJ_BZLSkQ7By8czRedItcP4Lz3fbiWWQKylitB6XsnGeJqRC",
                type: "Road",
            });
            map.addLayer(bing);
			map.addControl(new OpenLayers.Control.LayerSwitcher());

			map.setCenter(center, 9);
		},
		createEarthquakeLayer: function() {
			var eqLayer = AppLayers.getEarthquakeLayer();
			var map = new OpenLayers.Map('map-earthquake');
			var wmsLayers = AppLayers.getWMSLayers();
			map.addLayers([wmsLayers.blueMarble, eqLayer.earthquake_1]);
			map.addControl(new OpenLayers.Control.LayerSwitcher({}));
			if (!map.getCenter()) {
				map.zoomToMaxExtent();
			}
		},
	}
	return obj;
}); 