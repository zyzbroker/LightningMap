//@flow
({
    MARKER_TEXT_X: ['40','34', '26'],
    MARKER_TEMPLATE: '<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 31.999999 31.999999"><g transform="matrix(0.49994211,0,0,0.35779738,-7.6311526,-341.26742)">  <ellipse style="opacity:1;fill:#228b22;fill-opacity:0.99215686;stroke:#131409;stroke-width:0;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:1;stroke-dasharray:none;stroke-opacity:1" id="path3336-6-6-7" cx="47.388901" cy="988.88934" rx="31.85413" ry="34.286339" />  <rect style="opacity:1;fill:#228b22;fill-opacity:0.99215686;stroke:#131409;stroke-width:0;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:1;stroke-dasharray:none;stroke-opacity:1" id="rect3338-7-2-0" width="41.129089" height="41.294788" x="-582.5202" y="672.4411" transform="matrix(0.61993853,-0.78465038,0.56988721,0.82172292,0,0)" />  <ellipse style="opacity:1;fill:#ffffff;fill-opacity:0.99215686;stroke:#131409;stroke-width:0;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:1;stroke-dasharray:none;stroke-opacity:1" id="path3342-5-9-9" cx="47.781197" cy="987.47705" rx="23.459074" ry="23.929829" />  <text xml:space="preserve" alignment-baseline="central" x="{x}" y="990" linespacing="125%">{content}</text></g></svg>',

    onInit: function(cmp) {

        if (this._isGoogleMap(cmp)) {
            this._initGoogleMap(cmp);
        }
    },

    onRender: function(cmp) {
        if (!this._isMapLoaded(cmp) || !this._isMarkersChanged(cmp)) { return; }
        cmp.set('v.markersChanged', false);
        this._renderMarkers(cmp);
    },

    onLoaded: function(cmp, evt) {
        cmp.set('v.map', this._initLeafletMap(cmp.find('zyzMap').getElement(),
            cmp.get('v.currentGeoLocation'),
            function(data) {
                console.log(data);
            }));
    },

    markersChanged: function(cmp, markers) {
        cmp.set('v.markersChanged', true);
    },

    //---- private helper methods -----
    ////////////////////////////////////////////

    _initLeafletMap: function(mapId, currentGeo, markerClick) {
        var map = L.map(mapId, {
            tap: false,
            maxZoom: 19,
            setView: true
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        return map;
    },

    _renderMarkers: function(cmp) {
        var self = this,
            map = cmp.get('v.map'),
            markers = cmp.get('v.markers') || [];
        if (markers.length === 0) { return; }
        self._invalidateLayers(map);
        L.layerGroup(markers.map(function(e) {
            return self._genMarker(self, cmp, { lat: e.lat, lng: e.lng }, e.html, e.data);
        })).addTo(map);
        map.fitBounds(self._getLatLngBounds(markers));
    },

    _invalidateLayers: function(map) {
        map.eachLayer(function(layer) {
            if (!!layer.options.zyzData) {
                map.removeLayer(layer);
            }
        });
    },

    _getLatLngBounds: function(markers) {
        var maxLat = markers[0].lat,
            minLat = markers[0].lat,
            maxLng = markers[0].lng,
            minLng = markers[0].lng;
        markers.forEach(function(d) {
            if (d.lat > maxLat) {
                maxLat = d.lat;
            } else if (d.lat < minLat) {
                minLat = d.lat
            }
            if (d.lng > maxLng) {
                maxLng = d.lng;
            } else if( d.lng < minLng) {
                minLng = d.lng;
            }
        });

        return L.latLngBounds({ lat: maxLat, lng: minLng }, { lat: minLat, lng: maxLng });
    },

    _genMarker: function(self, cmp, geo, popUp, data) {
        var icon = L.divIcon({className: 'zyz-div-icon', html: self._genSvg(self, data.id)});
        var marker = L.marker(geo, {
            draggable: false,
            riseOnHover: true,
            zyzData: data,
            icon: icon
        });
        !!popUp && marker.bindPopup(popUp);
        marker.on('click', function(e){
            $A.getCallback(function(){
                var click = cmp.getEvent('zyzMapMarkerClickEvent');
                click.fire({
                    'data': e.target.options.zyzData,
                    'point': e.containerPoint
                });
            })();
        });
        return marker;
    },

    _genSvg: function(self, content){
        return self.MARKER_TEMPLATE.replace('{content}', content)
            .replace('{x}', self._calculateTextX(self, content));
    },

    _calculateTextX: function(self, content){
        var x = 0, len = (content + '' || '').length;
        if(len === 2) { x = 1;}
        else if (len < 2) { x=0; }
        else {x = 2;}
        return self.MARKER_TEXT_X[x];
    },

    _isMapLoaded: function(cmp) {
        return !!cmp.get('v.map');
    },

    _isMarkersChanged: function(cmp) {
        return cmp.get('v.markersChanged') == true;
    },

    _isGoogleMap: function(cmp) {
        return cmp.get('v.type') == 'google' ? 1 : 0;
    },

    _initGoogleMap: function(cmp) {
        console.log('--- load google ----');

    }
})