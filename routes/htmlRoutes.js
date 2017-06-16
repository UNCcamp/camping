const express = require("express");
var query = require("../controllers/controller")
var router = express.Router();

router.get("/", function (req, res) {
    res.render("index");
});

router.get("/backpack", function (req, res) {
    res.render("backpack");
});

router.get("/backpack/packer", function (req, res) {
    res.render("backPackPacker");
});

router.get("/campground", function (req, res) {
    res.render("campGroundResult");
});

router.get("/firstaid", function (req, res) {
    res.render("firstaid");
});

router.get("/mealplan", function (req, res) {
    res.render("mealPlan");
});

router.get("/profile", function (req, res) {
  if(true) { // will have to store user session here
    //query.getUserProfile(userID)
     // .then(function(result){
     res.render("ProfileMain", {
          imageURL:"https://prods3.imgix.net/images/articles/2017_01/Facebook-Salt-Bae-Meme-Butcher.jpg",
      //    result.campsites,
      //    result.Trails
      //
      //
      });
     // });
   }
   else {
     res.status("401")
     .send("not authorized");
   }
});

router.post("/authenticate", function(req,res) {
  
});



router.get("/login", function (req, res) {
    res.render("modalLogin");
});


router.get("/trail", function (req, res) {
    res.render("TrailResult");
});

module.exports = router;
