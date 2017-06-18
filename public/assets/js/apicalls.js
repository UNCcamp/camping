//keys
var mapboxKey = 'pk.eyJ1Ijoia3Jpa2FyciIsImEiOiJjajEwcmxpdmEwM2ZoMzJwZWNrc3hnYm13In0.8cXei-iPLO0qctadLZ9O9w';
//handlebars reference
var result;
var lat = 0;
var lng = 0;

$(document).on("click", "#campgrounds", function() {
    var target1 = $("#campSearch");
    userLocation("campgrounds", target1[0].attributes[0].ownerElement.value, function(result) {
        if (result.length > 0) {
            localStorage.clear();
            localStorage.setItem("campgrounds", JSON.stringify(result));            
            window.location = "/campground";
        } else {
            console.log("sorry, try again");
        }
    });
});


$(document).on("click", "#trails", function() {
    var target2 = $("#trailSearch");
    userLocation("trails", target2[0].attributes[0].ownerElement.value, function(result) {
        console.log(result);
        if (result.length > 0) {
            localStorage.clear();
            localStorage.setItem("trails", JSON.stringify(result));
            window.location = "/trail";
        } else {
            console.log("sorry, try again");
        }
    });
});

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
        // //call either campgrounds or trails function
        var result = [];
        if (call === "campgrounds") {
            result = campgroundCall(lat, lng, function(result) {
                cb(result);
            });
        } else {
            result = trailCall(lat, lng, function(result) {
                cb(result);
            });
        }
    });
}

//API call to get campgrounds in a 50 mile radius
function campgroundCall(lat, lng, callback) {
    map.flyTo({
        center: [lng, lat],
        zoom: 9
    });
    var queryURLfacility = "https://ridb.recreation.gov/api/v1/facilities/?activity=9&latitude=" + lat +
        "&longitude=" + lng + "&radius=50&apikey=1F46A83E349C407E8538DFA18D9C049A";
    // console.log(queryURLfacility);
    $.ajax({
        url: queryURLfacility,
        method: 'GET'
    }).done(function(response) {
        // console.log(response.RECDATA);
        var result = [];
        for (var i = 0; i < response.RECDATA.length; i++) {
            var campground = response.RECDATA[i];
            var campName = campground.FacilityName;
            var campDesc = campground.FacilityDescription;
            var campDir = campground.FacilityDirections;
            var campID = campground.FacilityID;
            var campLat = campground.FacilityLatitude;
            var campLng = campground.FacilityLongitude;
            var imageURL = "https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/static/geojson(%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B" + campLng + "%2C" + campLat + "%5D%7D)/" + campLng + "," + campLat + ",12/250x250?access_token=" + mapboxKey;
            result.push({
                name: campName,
                description: campDesc,
                directions: campDir,
                ID: campID,
                latitude: campLat,
                longitude: campLng,
                image: imageURL
            });
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
        callback(result);
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
//API call to get campsites for specific campground if we decide to go with this
// function campsiteCall(campgroundID, campgroundLatitude, campgroundLongitude) {
//
//         map.flyTo({
//         center: [campgroundLongitude, campgroundLatitude],
//         zoom: 15
//     });
//     var queryURLcampsite = "https://ridb.recreation.gov/api/v1/facilities/" + campgroundID + "/campsites/?apikey=1F46A83E349C407E8538DFA18D9C049A";
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
//         var result = [];
//         for (var i = 0; i < response.RECDATA.length; i++) {
//             var campsiteName = response.RECDATA[i].CampsiteName;
//             var campsiteType = response.RECDATA[i].CampsiteType;
//             var loop = response.RECDATA[i].Loop;
//             results.push({
//             name: campsiteName,
//             type: campsiteType,
//             loop: loop
//             });
//
//             num++;
//         }
//         return result;
//     });
//   }


//API call to get trails in a 50 mile radius around user's specified location
function trailCall(lat, lng, callback) {
    map.flyTo({
        center: [lng, lat],
        zoom: 9
    });
    //ajax call to RIDB for USFS trails
    var queryURLtrails = "https://ridb.recreation.gov/api/v1/trails/USFS/?latitude=" + lat + "&longitude=" + lng + "&radius=50&limit=12&apikey=1F46A83E349C407E8538DFA18D9C049A";
    console.log(queryURLtrails);
    $.ajax({
        url: queryURLtrails,
        method: 'GET'
    }).done(function(response) {
        console.log(response.RECDATA.length);
        var result = [];
        for (var i = 0; i < response.RECDATA.length; i++) {
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
            var trailLng = geoLine[0][0];
            var trailLat = geoLine[0][1];
            var imageURL = "https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/static/geojson(%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B" + trailLng + "%2C" + trailLat + "%5D%7D)/" + trailLng + "," + trailLat + ",12/250x250?access_token=" + mapboxKey;
            result.push({
                name: trailName,
                length: trailLength,
                number: trailNo,
                linestring: trailGEOM,
                latitude: trailLat,
                longitude: trailLng,
                image: imageURL
            });
            //add marker and popup for trail
            var popup = new mapboxgl.Popup({ offset: 25 })
                .setText('Trail Name: ' + trailName + '\nTrail Length: ' + trailLength + 'miles');
            // create DOM element for the marker
            var el = document.createElement('div');
            el.id = 'marker-trail';
            // create trail marker
            new mapboxgl.Marker(el, { offset: [-25, -25] })
                .setLngLat(latlng)
                .setPopup(popup) // sets a popup on this marker
                .addTo(map);
        }
        callback(result);
    });
}

// function to map trail GeoLine on map -- not working because it creates too many layers, work in progress

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
