//declare key variables
var RIDBKey = config.RIDBKey;
var mapboxKey = config.mapboxKey;

var lat = 0;
var lng = 0;

//define map
mapboxgl.accessToken = mapboxKey;
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v9', //stylesheet location
    center: [-97.1191, 38.60313], //starting position
    zoom: 2.9 //starting zoom
});

//get user's location for search -- modify for 
function userLocation(typeOfCall, location, cb) {
    //grab user's search parameter and use it to get coordinates
    var call = typeOfCall;
    var location = location.trim();
    var queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&sensor=false;'
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        //create variables for latitude and longitude of user input
        lat = response.results[0].geometry.location.lat;
        lng = response.results[0].geometry.location.lng;
        console.log(lat, lng);
        // //call either campgrounds or trails function
        var result = [];
        if (call === "campgrounds") {
            console.log("campground");
            result = campgroundCall(lat, lng);
        } else {
            console.log("trails");
            result = trailCall(lat, lng);
        }
        cb(result);
    });
}

//API call to get campgrounds in a 50 mile radius
function campgroundCall(lat, lng) {
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
        var result = [];
        for (var i = 0; i < response.RECDATA.length; i++) {
            var campground = response.RECDATA[i];
            var campName = campground.FacilityName;
            var campDesc = campground.FacilityDescription;
            var campDir = campground.FacilityDirections;
            var campID = campground.FacilityID;
            var campLat = campground.FacilityLatitude;
            var campLng = campground.FacilityLongitude;
            result.push({name: campName, 
                         description: campDesc, 
                         directions: campDir, 
                         ID: campID, 
                         latitude: campLat, 
                         longitude: campLng});
            // create the popup
            var popup = new mapboxgl.Popup({ offset: 25 })
                .setText('Campground Name: ' + campName);
            // create DOM element for the marker
            var el = document.createElement('div');
            el.id = 'marker';
            // create the marker
            new mapboxgl.Marker(el, { offset: [-25, -25] })
                .setLngLat([campLng, campLat])
                .setPopup(popup) // sets a popup on this marker
                .addTo(map);
        }
        return result;
    });
}

//API call to get campsites for specific campground
// $(document).on("click", ".campsite", function() {
//     console.log($(this).data("facID"));
//     var facilityID = $(this).data("facID");
//     var facilityLat = $(this).data("facLat");
//     var facilityLong = $(this).data("facLong");
//         map.flyTo({
//         center: [facilityLong, facilityLat],
//         zoom: 15
//     });
//     var queryURLcampsite = "https://ridb.recreation.gov/api/v1/facilities/" + facilityID + "/campsites/?apikey=1F46A83E349C407E8538DFA18D9C049A";
//     $.ajax({
//         url: queryURLcampsite,
//         method: 'GET'
//     }).done(function(response) {
//         console.log(response.RECDATA);
//         var num = 1;
//         for (var i = 0; i < response.RECDATA.length; i++) {
//             var res = $("<div class='info'>");
//             // res.attr("data", response.RECDATA[i].FacilityID);
//             var text = $("<p>");
//             text.append(num + ". <br>");
//             text.append("Campsite Name: " + response.RECDATA[i].CampsiteName + "<br>");
//             text.append("Campsite Type: " + response.RECDATA[i].CampsiteType + "<br>");
//             text.append("Loop: " + response.RECDATA[i].Loop + "<br>");
//             //append body to div
//             res.append(text);
//             var search = $("<button class='campsite'>");
//             search.attr("data", response.RECDATA[i].CampsiteID);
//             search.text("Choose Campsite");
//             //append button to div to search campsites of facility
//             res.append(search);
//             res.append("<br><br><hr>");
//             $("#campsites").append(res);
//             num++;
//         };
//     });
// });


//API call to get trails in a 50 mile radius around user's specified location
function trailCall(lat, lng) {
    map.flyTo({
        center: [lng, lat],
        zoom: 9
    });
    //ajax call to RIDB for USFS trails
    var queryURLtrails = "https://ridb.recreation.gov/api/v1/trails/USFS/?latitude=" + lat + "&longitude=" + lng + "&radius=50&apikey=1F46A83E349C407E8538DFA18D9C049A";
    console.log(queryURLtrails);
    $.ajax({
        url: queryURLtrails,
        method: 'GET'
    }).done(function(response) {
        console.log(response);
        var result = [];
        for (var i = 0; i < 24; i++) {
            var trail = response.RECDATA[i];
            var trailName = trail.TrailName;
            var trailLength = trail.SegmentLength;
            var trailNo = trail.TrailNo;
            var trailGEOM = trail.GEOM;
            //get and modify trail's linestring and lat and long of trail
            var geoLine = response.RECDATA[i].GEOM;
            geoLine = geoLine.match(/\([^()]*\)/g);
            geoLine = geoLine[0].replace(/[\(\)]/g, '').split(', ');
            for (var j = 0; j < geoLine.length; j++) {
                geoLine[j] = geoLine[j].split(" ");
            }
            for (var k = 0; k < geoLine.length; k++) {
                geoLine[k][0] = parseFloat(geoLine[k][0]);
                geoLine[k][1] = parseFloat(geoLine[k][1]);
            }
            // get latitude and longitude for trail
            var latlng = geoLine[0];
            console.log(latlng);

            result.push({
                name: trailName,
                length: trailLength,
                number: trailNumber,
                linestring: trailGEOM,
                coordinates: latlng
            });
            //add marker and popup for trail
            var popup = new mapboxgl.Popup({ offset: 25 })
                .setText('Trail Name: ' + trailName);
            // create DOM element for the marker
            var el = document.createElement('div');
            el.id = 'marker-trail';
            // create trail marker
            new mapboxgl.Marker(el, { offset: [-25, -25] })
                .setLngLat(latlng)
                .setPopup(popup) // sets a popup on this marker
                .addTo(map);
        }
        console.log(result);
    }); 
} //end function trailCall

// $(document).on("click", ".trail", function() {
//     //get and modify trail's linestring
//             var geoLine = $(this).data("LineString");
//             console.log(geoLine);
//             geoLine = geoLine.match(/\([^()]*\)/g);
//             geoLine = geoLine[0].replace(/[\(\)]/g, '').split(', ');
//             for (var j = 0; j < geoLine.length; j++) {
//                 geoLine[j] = geoLine[j].split(" ");
//             }
//             for (var k = 0; k < geoLine.length; k++) {
//                 geoLine[k][0] = parseFloat(geoLine[k][0]);
//                 geoLine[k][1] = parseFloat(geoLine[k][1]);
//             }
//             console.log(geoLine);
//             //  // add trail line to map
//             map.addLayer({
//                 "id": "route",
//                 "type": "line",
//                 "source": {
//                     "type": "geojson",
//                     "data": {
//                         "type": "Feature",
//                         "properties": {},
//                         "geometry": {
//                             "type": "LineString",
//                             "coordinates": geoLine
//                         }
//                     }
//                 },
//                 "layout": {
//                     "line-join": "round",
//                     "line-cap": "round"
//                 },
//                 "paint": {
//                     "line-color": "#888",
//                     "line-width": 8
//                 }
//             });   
// });
