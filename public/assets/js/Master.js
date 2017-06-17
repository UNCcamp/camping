// nav bar js 

function htmlbodyHeightUpdate() {
  var height3 = $(window).height()
  var height1 = $('.nav').height() + 50
  height2 = $('.main').height()
  if (height2 > height3) {
    $('html').height(Math.max(height1, height3, height2) + 10);
    $('body').height(Math.max(height1, height3, height2) + 10);
  } else {
    $('html').height(Math.max(height1, height3, height2));
    $('body').height(Math.max(height1, height3, height2));
  }

}
$(document).ready(function() {
  htmlbodyHeightUpdate()
  $(window).resize(function() {
    htmlbodyHeightUpdate()
  });
  $(window).scroll(function() {
    height2 = $('.main').height()
    htmlbodyHeightUpdate()
  });
});

// carousel js

$(document).ready(function() {
  $('#Carousel').carousel({
    interval: 3000
  })
});
$(document).ready(function() {
  $('#Carousel2').carousel({
    interval: 3000
  })
});
$(document).ready(function() {
  $('#Carousel3').carousel({
    interval: 3000
  })
});

//added in place of the search javascript
var target1 = $("#campSearch")
var target2 = $("#trailSearch")

userLocation("campgrounds", "city", function(result) {
  return result;
});

$(document).on("click", ".submit1", userLocation("trails", target1[0].childNodes[0].data, function(result) {
  return result;
}))


$(document).on("click", ".submit2", userLocation("trails", target2[0].childNodes[0].data, function(result) {
  return result;
}))