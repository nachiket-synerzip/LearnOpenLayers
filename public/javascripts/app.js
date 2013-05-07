define(['openlayers', 'app-layers'],
    function(OpenLayers, AppLayers) {
    	var map;
    	map = new OpenLayers.Map('map');
		var obj = {
			start: function() {
				map.addLayers([
					AppLayers.wms_layer_map,
					AppLayers.wms_layer_labels,
					AppLayers.wms_state_lines,
					AppLayers.wms_water_depth,
					AppLayers.wms_roads
				]);
				map.addControl(new OpenLayers.Control.LayerSwitcher({}));
				if(!map.getCenter()){
					map.zoomToMaxExtent();
				}
			}
		}
		return obj;
    }
);