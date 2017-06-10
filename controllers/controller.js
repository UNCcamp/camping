
var express = require('express');
var router = express.Router();
var camp = require('../models/camp.js');

// add a '/' endpoint that redirects to the /index route
router.get('/', function(req, res) {
	res.redirect('/index');
});

module.exports = router;