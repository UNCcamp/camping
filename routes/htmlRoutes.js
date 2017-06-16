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
  // query.getUserProfile(userID)
  // .then(function(result){
    res.render("ProfileMain");
  // });

});

router.get("/trail", function (req, res) {
    res.render("TrailResult");
});

module.exports = router;
