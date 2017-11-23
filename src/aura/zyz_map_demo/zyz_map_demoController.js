({
    onInit: function(cmp, evt, h){
        h.init(cmp);
    },

    onChangeMarkers: function(cmp, evt,h){
        h.changeMarkers(cmp);
    },

    onMarkerClick: function(cmp, evt, h){
        h.clickMarker(cmp, evt);
    }
})