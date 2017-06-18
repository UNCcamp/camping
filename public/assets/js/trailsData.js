$(document).ready(function() {

    var trails = JSON.parse(localStorage.getItem("trails"));
    console.log(trails);
    console.log(trails[0].name + ", " + trails[0].length);
    // var source = $("#trails-template").html();
    // console.log(source);
    // var template = Handlebars.compile(source);
    // $('body').append(template(trails));
    for (var i = 0; i < trails.length; i++) {
    	var trail = trails[i];
        $('#trails').append("<div class='col-sm-6 col-md-3'><div class='thumbnail'><h3 class='text-center'><strong>" + 
        	                trail.name + "</strong></h3><img src='" + trail.image + "' alt=" + trail + i + 
        	                "><div class='caption'></h3><h3>Trail Length: " + trail.length + "</h3><h3>Trail Latitude: " + 
        	                trail.latitude + "</h3><h3>Trail Longitude: " + trail.longitude + 
        					"<p><a href='#' class='btn btn-primary' role='button'>Save Trail</a></p></div></div></div>");
    }
})
