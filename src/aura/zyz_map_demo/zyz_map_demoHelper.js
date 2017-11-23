({
    init: function(cmp) {
        cmp.set('v.markers', this._genMarkers0());
        cmp.set('v.currentGeo', {
            lat: 40.04444,
            lng: -101.60156
        });
    },

    clickMarker: function(cmp, evt){
        console.log(evt.getParams());
    },

    changeMarkers: function(cmp) {
        var switchFlag = !!cmp.get('v.switch') ? 0 : 1;
        cmp.set('v.markers', this['_genMarkers' + switchFlag]());
        cmp.set('v.switch', switchFlag == 1);
    },

    _genMarkers0: function() {
        return [
            this._genMarker(36.9728, -122.02103, 'Baby Shop', 1, 'Walmart'),
            this._genMarker(36.97218, -122.02764, 'Auto Clean Shop', 2, 'SuperSonic'),
            this._genMarker(36.9669, -122.03605, 'Swimming Club', 3, 'LAC'),
            this._genMarker(36.95943, -122.03811, 'Six Flag Theme Park', 4, 'SixFlagInc'),
            this._genMarker(36.96471, -122.01545, 'Beach Steak', 5, 'Taco Bell'),
            this._genMarker(36.95627, -122.02764, 'UC@SantaCruz', 6, 'University Of Calinornia'),
        ];
    },

    _genMarkers1: function() {
        return [
            this._genMarker(49.15835, -123.09629, 'UBC', 10, 'University of B.C.'),
            this._genMarker(49.09184, -123.16084, 'Westham Island', 12, 'Hotels.Com'),
            this._genMarker(48.99372, -123.07981, 'Point roberts', 13, 'RobertAutoInc'),
            this._genMarker(49.2418, -123.09904, 'Sea World Park', 14, 'DisneyWorld'),
            this._genMarker(49.15475, -123.10179, 'Lulu Island', 15, 'City Hall'),
            this._genMarker(49.11432, -122.80241, 'Moutain Valley', 16, 'Canadian National Park'),
        ];
    },

    _genMarker: function(lat, lng, title, dataId, dataAccount) {
        return {
            'lat': lat,
            'lng': lng,
            'html': dataId < 10 ? this._genHtml(title, dataId, dataAccount) : 0,
            'data': {
                'id': dataId,
                'account': dataAccount
            }
        }
    },

    _genHtml: function(title, id, account){
        var html = [];
        html.push('<div>');
        html.push(['<h3 style="font-weight:700;">', title, '</h3>'].join(''));
        html.push('<div>');
        html.push(['<a href="javascript:void(0);">', account, '</a>'].join(''));
        html.push('</div>');
        html.push('</div>');
        return html.join('');
    }
})