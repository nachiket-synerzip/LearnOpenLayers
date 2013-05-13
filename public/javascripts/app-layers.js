define(["openlayers"], function(OpenLayers){
	return {
		getWMSLayers: function(){
			return {
				wms_layer_map : new OpenLayers.Layer.WMS(
					'Base layer',
					'http://vmap0.tiles.osgeo.org/wms/vmap0',
					{
						layers: 'basic'
					},
					{
						isBaseLayer: true
					}
				),
				wms_layer_labels : new OpenLayers.Layer.WMS(
					'Location Labels',
					'http://vmap0.tiles.osgeo.org/wms/vmap0',
					{
						layers: 'clabel,ctylabel,statelabel',
						transparent: true
					},
					{
						opacity: .5
					}
				),
				wms_state_lines : new OpenLayers.Layer.WMS(
					'State Line Layer',
					'http://labs.metacarta.com/wms/vmap0',
					{
						layers: 'stateboundary',
						transparent: true
					},
					{
						displayInLayerSwitcher: false,
						minScale: 13841995.078125
					}
				),
				wms_water_depth : new OpenLayers.Layer.WMS(
					'Water Depth',
					'http://labs.metacarta.com/wms/vmap0',
					{
						layers: 'depthcontour',
						transparent: true
					},
					{
						opacity:0.8
					}
				),
				wms_roads : new OpenLayers.Layer.WMS(
					'Roads',
					'http://labs.metacarta.com/wms/vmap0',
					{
						layers: 'priroad,secroad,rail',
						transparent: true
					},
					{
						transistionEffect:'resize'
					}
				),
				blueMarble : new OpenLayers.Layer.WMS(
                	"Global Imagery - Blue Marble",
                	"http://maps.opengeo.org/geowebcache/service/wms",
                	{
                		layers: "bluemarble"
                	}
            	),
            	openStreetMap : new OpenLayers.Layer.WMS(
                	"Global Imagery - Open Street Map",
                	"http://maps.opengeo.org/geowebcache/service/wms",
                	{
                		layers: "openstreetmap",
                		format: "image/png"
                	}
            	)	
			}
		},
		getEarthquakeLayer: function() {
			return {
				earthquake_1: new OpenLayers.Layer.Vector("Earthquakes", {
    				strategies: [new OpenLayers.Strategy.Fixed()],
    				protocol: new OpenLayers.Protocol.HTTP({
        				url: "/data/7day-M2.5.xml",
        				format: new OpenLayers.Format.GeoRSS()
    				})
				})
			}
		}
	}
});