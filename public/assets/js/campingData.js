$(document).ready(function() {
    //grab data from localstorage
    var campgrounds = JSON.parse(localStorage.getItem("campgrounds"));
    console.log(campgrounds);
    for (var i = 0; i < campgrounds.length; i++) {
    	var campground = campgrounds[i];
        $('#campgrounds').append("<div class='col-sm-6 col-md-4'><div class='thumbnail'><h3 class='text-center'><strong>" + 
                campground.name + "</strong></h3><img src='" + campground.image + "' alt=" + campground + i + 
                "><div class='caption'></h3><h3>" + campground.description + "<h3>Directions: " + 
                campground.directions + "</h3><h3>Campground Latitude: " + campground.latitude + 
                "</h3><h3>Campground Longitude: " + campground.longitude + 
				"<p><a href='#' class='btn btn-primary' id='saveCampground' role='button'>Save Campground</a></p></div></div></div>");
    }
});