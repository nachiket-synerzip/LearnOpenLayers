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
				)	
			}
		},
		getGoogleLayers: function() {
			return	{
				google_map_layer : new OpenLayers.Layer.Google(
					'Google Map Layer',
					{}
				)
			}
		},
		getImageLayers: function() {
			return {
				image_layer_1 : new OpenLayers.Layer.Image(
					'Wallpaper',
					'http://2.bp.blogspot.com/-spfHNq1iEu8/T6-2wXITq9I/AAAAAAAAKLM/EgQHWf7rPtI/s1600/World_Map_of_Ice_and_Fire.jpg',
					new OpenLayers.Bounds(-400,-250,400,250),
					new OpenLayers.Size(1600,1596),
					{
						numZoomLevels:7, 
						maxResolution:.625
					}
				)
			}
		}
	}
});