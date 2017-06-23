const express = require("express");
var query = require("../controllers/controller");
var utils = require("../utils/utils");
var router = express.Router();

//router.use(cleanCookie); if we needed this to be checked for all routes

router.get("/", function (req, res) {
    res.render("index");
});

router.get("/backpack",function (req, res) {
    query.getUserProfileById(userid)
    .then(function(userResult) {
      res.render("backpack", {
        imageURL: userResult[0].imageURL,
        firstName: userResult[0].firstName,
        lastName: userResult[0].lastName,
        userCity: userResult[0].userCity,
      });
    });
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

router.get("/profile", cleanCookie, function (req, res) {
  var userid = req.isAuth;
  query.getUserProfileById(userid)
    .then(function(userResult) {
      if(userResult) {
        query.getUserLocations(userid)
          .then(function(locResult){
            var imagesResult = utils.handleBarsDataReady(locResult);
             res.render("ProfileMain", {
               imageURL: userResult[0].imageURL,
               firstName: userResult[0].firstName,
               lastName: userResult[0].lastName,
               userCity: userResult[0].userCity,
               aboutMe: userResult[0].aboutMe,
               campImages: imagesResult
              });
            //res.send(imagesResult);
          })
          .catch(function(){
            res.status("500")
            .send("Error getting location images");
          });
        }
        else {
          res.status("500")
          send("Not found");
        }
      })
      .catch(function(){
        res.status("500")
        .send("sequelize error occured")
      });
});

router.get("/login", function (req, res) {
    res.render("modalLogin");
});

router.get("/trail", function (req, res) {
    res.render("TrailResult");
});

router.get("/mapkey",function(req, res) {

  res.status("200")
  .send(process.env.MAPBOXKEY);

});

function cleanCookie(req,res,next) {
    if(!req.headers.hasOwnProperty('cookie')) {
      res.render("modalLogin");
    }
    else if(req.headers.cookie.includes("user=")) {
      var userid = req.headers.cookie.split("user=");
      req.isAuth = userid;
      next();
    }
    else {
      res.render("modalLogin");
    }
}

module.exports = router;
