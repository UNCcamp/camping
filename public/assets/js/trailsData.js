$(document).ready(function() {

    var trails = JSON.parse(localStorage.getItem("trails"));
    console.log(trails);
    console.log(trails[0].name + ", " + trails[0].length);
    var source = $("#trails-template").html();
    console.log(source);
    // var template = Handlebars.compile(source);
    // $('body').append(template(result));

})
