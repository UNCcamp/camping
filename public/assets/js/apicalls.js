var lat = 0;
var lng = 0;

//define map
mapboxgl.accessToken = 'pk.eyJ1Ijoia3Jpa2FyciIsImEiOiJjajEwcmxpdmEwM2ZoMzJwZWNrc3hnYm13In0.8cXei-iPLO0qctadLZ9O9w';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v9', //stylesheet location
    center: [-97.1191, 38.60313], //starting position
    zoom: 2.9 //starting zoom
});
//add user's geolocation
// map.addControl(new mapboxgl.GeolocateControl());

//get user's location for search -- modify for 
$(document).on("click", ".submit", function() {
    event.preventDefault();
    //grab user's search parameter and use it to get coordinates
    var call = $(this).data("kind");
    var location = $("#location").val().trim();
    var queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&sensor=false;'
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        //create variables for latitude and longitude of user input
        lat = response.results[0].geometry.location.lat;
        lng = response.results[0].geometry.location.lng;
        // //call either campgrounds or trails function
        if (call === "campgrounds") {
            campgroundCall(lat, lng);
        } else {
            trailCall(lat, lng);
        }
    });
});

//API call to get campgrounds in a 50 mile radius
function campgroundCall() {
    $("#campgrounds").html("");
    map.flyTo({
        center: [lng, lat],
        zoom: 9
    });
    var queryURLfacility = "https://ridb.recreation.gov/api/v1/facilities/?activity=9&latitude=" + lat +
        "&longitude=" + lng + "&radius=50&apikey=1F46A83E349C407E8538DFA18D9C049A";
    console.log(queryURLfacility);
    $.ajax({
        url: queryURLfacility,
        method: 'GET'
    }).done(function(response) {
        console.log(response.RECDATA);
        var num = 1;
        for (var i = 0; i < response.RECDATA.length; i++) {
            var campground = response.RECDATA[i];
            var res = $("<div class='info'>");
            // res.attr("data", response.RECDATA[i].FacilityID);
            var text = $("<p>");
            text.append(num + ". <br>");
            text.append("Facility Name: " + campground.FacilityName + "<br>");
            // text.append("Facility ID: " + response.RECDATA[i].FacilityID + "<br>");
            text.append("Description:   " + campground.FacilityDescription + "<br>");
            text.append("Directions:    " + campground.FacilityDirections + "<br>");
            //append body to div
            res.append(text);
            var search = $("<button class='campsite'>");
            search.data("facID", campground.FacilityID);
            search.text("Choose Campsite");
            //append button to div to search campsites of facility
            res.append(search);
            res.append("<br><br><hr>");
            $("#campgrounds").append(res);
            // create the popup
            var popup = new mapboxgl.Popup({ offset: 25 })
                .setText('Campground Name: ' + campground.FacilityName);
            // create DOM element for the marker
            var el = document.createElement('div');
            el.id = 'marker';
            console.log(campground.FacilityLongitude, campground.FacilityLatitude);
            // create the marker
            new mapboxgl.Marker(el, { offset: [-25, -25] })
                .setLngLat([campground.FacilityLongitude, campground.FacilityLatitude])
                .setPopup(popup) // sets a popup on this marker
                .addTo(map);
            num++;
        }

    });
}

//API call to get campsites for specific campground
$(document).on("click", ".campsite", function() {
    console.log($(this).data("facID"));
    var facilityID = $(this).data("facID");
    var queryURLcampsite = "https://ridb.recreation.gov/api/v1/facilities/" + facilityID + "/campsites/?apikey=1F46A83E349C407E8538DFA18D9C049A";
    $.ajax({
        url: queryURLcampsite,
        method: 'GET'
    }).done(function(response) {
        console.log(response.RECDATA);
        var num = 1;
        for (var i = 0; i < response.RECDATA.length; i++) {
            var res = $("<div class='info'>");
            // res.attr("data", response.RECDATA[i].FacilityID);
            var text = $("<p>");
            text.append(num + ". <br>");
            text.append("Campsite Name: " + response.RECDATA[i].CampsiteName + "<br>");
            text.append("Campsite Type: " + response.RECDATA[i].CampsiteType + "<br>");
            text.append("Loop: " + response.RECDATA[i].Loop + "<br>");
            //append body to div
            res.append(text);
            var search = $("<button class='campsite'>");
            search.attr("data", response.RECDATA[i].CampsiteID);
            search.text("Choose Campsite");
            //append button to div to search campsites of facility
            res.append(search);
            res.append("<br><br><hr>");
            $("#campsites").append(res);
            num++;
        };
    });
});


//API call to get trails in a 50 mile radius around user's specified location
function trailCall() {
    $("#trails").html("");
    map.flyTo({
        center: [lng, lat],
        zoom: 9
    });
    //ajax call to RIDB for USFS trails
    var queryURLtrails = "https://ridb.recreation.gov/api/v1/trails/USFS/?latitude=" + lat + "&longitude=" + lng + "&radius=100&apikey=1F46A83E349C407E8538DFA18D9C049A";
    console.log(queryURLtrails);
    $.ajax({
        url: queryURLtrails,
        method: 'GET'
    }).done(function(response) {
        console.log(response);
        var num = 1;
        //get all responses and print them to page
        for (var i = 0; i < response.RECDATA.length; i++) {
            var res = $("<div class='info'>");
            // res.attr("data", response.RECDATA[i].FacilityID);
            var text = $("<p>");
            text.append(num + ". <br>");
            text.append("Trail Name: " + response.RECDATA[i].TrailName + "<br>");
            text.append("Trail Length: " + response.RECDATA[i].SegmentLength + "<br>");
            // text.append("GEO: " + response.RECDATA[i].GEOM + "<br>");
            //append body to div
            res.append(text);
            var search = $("<button class='trail'>");
            search.attr("data", response.RECDATA[i].FacilityID);
            search.text("Choose Trail");
            //append button to div to search campsites of facility
            res.append(search);
            res.append("<br><br><hr>");
            $("#trails").append(res);
            var geoLine = response.RECDATA[i].GEOM;
            console.log(geoLine);
            var linestring = new Array();
            linestring = geoLine.split("(");
            console.log(linestring);            
            // var popup = new mapboxgl.Popup({ offset: 25 })
            //     .setText('Trail Name: ' + response.RECDATA[i].TrailName +
            //             '<br>Trail Length: ' + response.RECDATA[i].SegmentLength);
            // // create DOM element for the marker
            // var el = document.createElement('div');
            // el.id = 'marker';
            // console.log(campground.FacilityLongitude, campground.FacilityLatitude);
            // // create the marker
            // new mapboxgl.Marker(el, { offset: [-25, -25] })
            //     .setLngLat([campground.FacilityLongitude, campground.FacilityLatitude])
            //     .setPopup(popup) // sets a popup on this marker
            //     .addTo(map);
            num++;
        }

    });
}
