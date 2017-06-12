const express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.render("index");
});

router.get("/backpack", function (req, res) {
    res.render("index");
});

router.get("/backpack/packer", function (req, res) {
    res.render("index");
});

router.get("/campground", function (req, res) {
    res.render("index");
});

router.get("/firstaid", function (req, res) {
    res.render("index");
});

router.get("/mealplan", function (req, res) {
    res.render("index");
});

router.get("/profile", function (req, res) {
    res.render("index");
});

router.get("/trail", function (req, res) {
    res.render("index");
});





module.exports = router;
