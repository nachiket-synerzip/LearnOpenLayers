define(['openlayers', 'app-layers', 'jquery', 'jquery_ui'],
    function(OpenLayers, AppLayers, $, ui) {
    	
		var obj = {
			start: function() {
				$(function(){
					$('#maps-tabs').tabs();
				});
				this.createMap('WMS');
			},
			createMap: function(type) {
				var map;
				switch(type) {
					case 'Google':
						map = new OpenLayers.Map('map-google');
						map.addLayer(Applayers.google_map_layer);
					break;
					case 'WMS':
						map = new OpenLayers.Map('map-wms');
						map.addLayers([
							AppLayers.wms_layer_map,
							AppLayers.wms_layer_labels,
							AppLayers.wms_state_lines,
							AppLayers.wms_water_depth,
							AppLayers.wms_roads
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