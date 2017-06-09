const express = require("express");
var router = express.Router();
var cyrpto = require("./authCode");

router.post('/login', function (req, res) {
  res.send('POST request to homepage');
});

router.post('/adduser', function (req, res) {
  res.send('POST request to homepage');
});

router.post('/updateuser', function (req, res) {
  res.send('POST request to homepage');
});

module.exports = router;
