# Salesforce Lightning Component - Map

The lightning Map component enables the application devolpers to easily integrate MAP capability with their business 
application. It leverages Google Map (service fee) or leaflet Open Street Map (free) to provide data map-based interaction.
Currently the leaflet based map component is ready for production usage. The Google map is in development.


## How to install Lightning Map Component And Demo
[Unmanaged package](https://login.salesforce.com/packaging/installPackage.apexp?p0=04t6A000000JS2r)

## How to use the Lightning MAP Component

### Step1: add the below html into your container component
```HTML
 <c:zyz_map type="leaflet" currentGeoLocation="{!v.currentGeo}" markers="{!v.markers}"/>
```

#### attribute definitions
```
 markers: a list of marker object
 currentGeoLocation: GEO location used to center the MAP. currently it is not used.
 type: google, leaflet. default to "leaflet"
 googleApiKey: your google map API key
```

#### Component event definition: zyz_map_marker_click_event
```
point: the x, y position relative to the map container
data: A object literal binded to the Marker
```

#### about Marker Object
```
    { 
        'lat': latitude,
        'lng': longitude,
        'html': if empty, no popup is binded to the marker on the map.
        'data': object literal of the data object that you want to bind to each marker.
    }
```

### Step2: in your container component, you need to handle the notfication event

```HTML
    <aura:handler name="zyzMapMarkerClickEvent" event="c:zyz_map_marker_click_event" 
    action="{!c.onMarkerClick}"/>
```

```Javascript
   onChangeMarkers: function(cmp, evt,h){
        console.log(evt.getParams());   
    },
```

### About Marker SVG Icon
We have customized the marker icon to cotain a label with length <= 3 characters inside the SVG. The map will try to align 
the label in the central place with the label length.


## We are using the following opensource map library Leaflet 1.2.0
[Leaflet JS](http://leafletjs.com/index.html)

## Note
Currently we only support leaflet open street map integration. we are working on Google MAP integration. 
And will be included in the next release.


## The Lightning Map Demo Screenshot

![GitHub Logo](/images/lightning_leaflet_map_demo.png)