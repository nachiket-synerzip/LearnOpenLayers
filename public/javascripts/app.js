define(['openlayers', 'app-layers', 'jquery', 'jquery_ui'],
    function(OpenLayers, AppLayers, $, ui) {
    	
		var obj = {
			start: function() {
				$(function(){
					$('#maps-tabs').tabs();
				});
				this.createMap('WMS');
				var self = this;
				$(document).ready(function(){
					try {
						self.createMap('Custom');
					} catch(e){
						console.log("Error while creating Custom Map");
					}
					try {
						self.createMap('Google');
					} catch(e){
						console.log("Error while creating Google Map");
					}
				});
				
			},
			createMap: function(type) {
				var map;
				switch(type) {
					case 'Google':
						map = new OpenLayers.Map('map-google');
						var googleLayers = AppLayers.getGoogleLayers();
						map.addLayer(googleLayers.google_map_layer);
					break;
					case 'WMS':
						map = new OpenLayers.Map('map-wms');
						var wmsLayers = AppLayers.getWMSLayers();
						map.addLayers([
							wmsLayers.wms_layer_map,
							wmsLayers.wms_layer_labels,
							wmsLayers.wms_state_lines,
							wmsLayers.wms_water_depth,
							wmsLayers.wms_roads
						]);
					break;
					case 'Custom':
						map = new OpenLayers.Map('map-image');
						var imgLayers = AppLayers.getImageLayers();
						console.log("adding custom layer");
						map.addLayers([
							imgLayers.image_layer_1
						]);
					break;
				}
				map.addControl(new OpenLayers.Control.LayerSwitcher({}));
				if(!map.getCenter()){
					map.zoomToMaxExtent();
				}
			}
		}
		return obj;
    }
);