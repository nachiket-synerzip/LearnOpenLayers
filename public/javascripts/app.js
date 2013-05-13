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
					case 'WMS':
						map = new OpenLayers.Map('map-wms');
						var wmsLayers = AppLayers.getWMSLayers();
						map.addLayers([
							wmsLayers.blueMarble
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