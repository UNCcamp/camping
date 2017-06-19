//keys
var mapboxKey ='pk.eyJ1Ijoia3Jpa2FyciIsImEiOiJjajEwcmxpdmEwM2ZoMzJwZWNrc3hnYm13In0.8cXei-iPLO0qctadLZ9O9w';
var RIDBkey = '1F46A83E349C407E8538DFA18D9C049A';
//handlebars reference
var result;
var lat = 0;
var lng = 0;

//store camping results and lat/lng results in localstorage and call next page
$(document).on("click", "#campgrounds", function() {
    var target1 = $("#campSearch");
    userLocation("campgrounds", target1[0].attributes[0].ownerElement.value, function(result) {
        if (result.length > 0) {
            localStorage.clear();
            localStorage.setItem("campgrounds", JSON.stringify(result)); 
            localStorage.setItem("latitude", lat);
            localStorage.setItem("longitude", lng);           
            window.location = "/campground";
        } else {
            console.log("sorry, try again");
        }
    });
});

//store trail results and lat/lng in local storage and call next page
$(document).on("click", "#trails", function() {
    var target2 = $("#trailSearch");
    userLocation("trails", target2[0].attributes[0].ownerElement.value, function(result) {
        console.log(result);
        if (result.length > 0) {
            localStorage.clear();
            localStorage.setItem("trails", JSON.stringify(result));
            localStorage.setItem("latitude", lat);
            localStorage.setItem("longitude", lng); 
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
    var queryURLfacility = "https://ridb.recreation.gov/api/v1/facilities/?activity=9&latitude=" + lat +
        "&longitude=" + lng + "&radius=50&apikey=" + RIDBkey;
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
            var imageURL = "https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/static/geojson(%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B" + 
                           campLng + "%2C" + campLat + "%5D%7D)/" + campLng + "," + campLat + ",15/250x250?access_token=" + mapboxKey;
            result.push({
                name: campName,
                description: campDesc,
                directions: campDir,
                ID: campID,
                latitude: campLat,
                longitude: campLng,
                image: imageURL
            });
        }
        callback(result);
    });
}

//API call to get trails in a 50 mile radius around user's specified location
function trailCall(lat, lng, callback) {
    map.flyTo({
        center: [lng, lat],
        zoom: 9
    });
    //ajax call to RIDB for USFS trails
    var queryURLtrails = "https://ridb.recreation.gov/api/v1/trails/USFS/?latitude=" + lat + "&longitude=" + lng + "&radius=50&limit=12&apikey=" + RIDBkey;
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
            var imageURL = "https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/static/geojson(%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B" + 
                           trailLng + "%2C" + trailLat + "%5D%7D)/" + trailLng + "," + trailLat + ",12/250x250?access_token=" + mapboxKey;
            result.push({
                name: trailName,
                length: trailLength,
                number: trailNo,
                linestring: trailGEOM,
                latitude: trailLat,
                longitude: trailLng,
                image: imageURL
            });
        }
        callback(result);
    });
}
