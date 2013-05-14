define(['openlayers', 'app-layers', 'jquery', 'jquery_ui'], function(OpenLayers, AppLayers, $, ui) {

	var obj = {
		eqMap: null,
		eqPopup: null,
		start : function() {
			$(function() {
				$('#maps-tabs').tabs();
			});
			this.createWMSMap('WMS');
			this.createMapWithOptions();
			this.createEarthquakeLayer();
			this.createGeoJSONLayer();
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
			var eqVector = AppLayers.getEarthquakeLayer().earthquake_1;
			var map = new OpenLayers.Map('map-earthquake');
			this.eqMap = map;
			var wmsLayers = AppLayers.getWMSLayers();
			map.addLayers([wmsLayers.blueMarble, eqVector]);
			map.addControl(new OpenLayers.Control.LayerSwitcher({}));
			var featureControl = new OpenLayers.Control.SelectFeature(
				[eqVector], {
					hover: false,
					clickout: true
				}
			);
			map.addControl(featureControl);
			featureControl.activate();
			console.log(featureControl);
			if (!map.getCenter()) {
				map.zoomToMaxExtent();
			}
			var self = this;
			eqVector.events.on({
                "featureselected": function(e) {
                	var attr = e.feature.attributes;
                	console.log(e.feature.geometry);
                    //self.showInfo(attr.title, attr.description, attr.link);
                    self.showEqPopup(e.feature);
                },
                "featureunselected": function(e) {
                	var attr = e.feature.attributes;
                    //self.showInfo(attr.title, attr.description, attr.link);
                    self.hideEqPopup();
                }
            });
		},
		showInfo: function(t, d, l) {
			$("#eq-info-div").html("<h4>" + t + "</h4><div>" + d + "</div><div><a href='" + l + "'>Link</a></div>");
		},
		showEqPopup: function (feature) {
			console.log(OpenLayers.Popup);
			var t = feature.attributes.title,
				d = feature.attributes.description,
				l = feature.attributes.description,
				popup = new OpenLayers.Popup("chicken",
				new OpenLayers.LonLat(feature.geometry.x, feature.geometry.y),
				new OpenLayers.Size(200,200),
				"<h4>" + t + "</h4><div>" + d + "</div><div><a href='" + l + "'>Link</a></div>",
				true
			);
			//popup.contentHTML = feature.attributes.description;
			this.eqMap.addPopup(popup);
			this.eqPopup = popup;
		},
		hideEqPopup: function() {
			this.eqMap.removePopup(this.eqPopup);
			this.eqPopup = null;
		},
		createGeoJSONLayer: function() {
			var apiKey= "AlucD6JGAHASammfZJ_BZLSkQ7By8czRedItcP4Lz3fbiWWQKylitB6XsnGeJqRC";
			var hybrid = new OpenLayers.Layer.Bing({
    			key: apiKey,
    			type: "AerialWithLabels",
    			name: "Bing Aerial With Labels"
			});

			var vector = new OpenLayers.Layer.Vector("GeoJSON", {
    				projection: "EPSG:2908",
    				strategies: [new OpenLayers.Strategy.Fixed()],
    				protocol: new OpenLayers.Protocol.HTTP({
        				url: "data/ny_buildings_2908.json",
        				format: new OpenLayers.Format.GeoJSON()
    				})
			});
			
			//FIXME : The Vector does not show up !

			var center = new OpenLayers.LonLat(987837.625, 212499.46875).transform("EPSG:2908", "EPSG:900913");
			//8.837963756293503, 1.8636707224013
			//var center = new OpenLayers.LonLat(8.837963756293503, 1.8636707224013);
			

			var map = new OpenLayers.Map({
    			div: "map-geojson",
    			//layers: [hybrid, vector],
    			layers: [hybrid],
    			center: center,
    			zoom: 4
			});
			console.log(vector);
		}
	}
	return obj;
}); 