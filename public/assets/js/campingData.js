$(document).ready(function() {
var mapboxKey = 'pk.eyJ1Ijoia3Jpa2FyciIsImEiOiJjajEwcmxpdmEwM2ZoMzJwZWNrc3hnYm13In0.8cXei-iPLO0qctadLZ9O9w';

    //define map
    mapboxgl.accessToken = mapboxKey;
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/outdoors-v9', //stylesheet location
        center: [-97.1191, 38.60313], //starting position
        zoom: 2.9 //starting zoom
    });
    //grab data from localstorage
    var campgrounds = JSON.parse(localStorage.getItem("campgrounds"));
    var lat = localStorage.getItem("latitude");
    var lng = localStorage.getItem("longitude");
    var num = 0;
    map.flyTo({
        center: [lng, lat],
        zoom: 9
    });
    console.log(lat, lng);
    console.log(campgrounds);
    for (var i = 0; i < campgrounds.length; i++) {
        num++;
        var campground = campgrounds[i];
        // create the popup for map
        var popup = new mapboxgl.Popup({ offset: 25 })
            .setText('Campground Name: ' + campground.name);
        // create DOM element for the marker
        var el = document.createElement('div');
        el.id = 'marker';
        // create the marker
        new mapboxgl.Marker(el, { offset: [-25, -25] })
            .setLngLat([campground.longitude, campground.latitude])
            .setPopup(popup) // sets a popup on this marker
            .addTo(map);

        $('#campgrounds').append("<div class='col-sm-6 col-md-4'><div class='thumbnail'><h3 class='text-center'><strong>" +
            campground.name + "</strong></h3><img src='" + campground.image + "' alt=" + campground + i +
            "><div class='caption'><h3>" + campground.description + "</h3<h3>Directions: " +
            campground.directions + "</h3><h3>Campground Latitude: " + campground.latitude +
            "</h3><h3>Campground Longitude: " + campground.longitude +
            "<p><a href='#' class='btn btn-primary' id='saveCampground' role='button'>Save Campground</a></p></div></div></div>");
        //adding clearfix to align thumbnails of different heights
        if (num % 3 === 0) {
            $("#campgrounds").append("<div class='clearfix visible-lg-block'></div>");
        }
    }
});
