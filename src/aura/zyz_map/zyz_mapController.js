({
    onInit: function(cmp, evt, h){
        h.onInit(cmp);
    },

    onLoaded: function(cmp, evt, h){
        h.onLoaded(cmp,evt);
    },

    onMarkersChanged: function(cmp, evt,h){
        h.markersChanged(cmp, cmp.get('v.markers'));
    },

    onRender: function(cmp, evt, h){
        h.onRender(cmp,evt);
    }
})