const express = require("express");
var router = express.Router();
var auth = require("./authCode");

router.post('/login', function (req, res) {
  var username = req.body.username;
  var pass = req.body.pass;
  if((auth.decrypt(/*from server **/)) === pass) {
    res.send(true);
  }
  res.send(false);
});

router.post('/adduser', function (req, res) {
  var username = req.body.username;
  var pass = req.body.pass;
  var result = auth.encrypt(pass);
  if(typeof(result) === "string") {
    res.send(result);
  }
  res.send(false);
});

router.post('/updateuser', function (req, res) {
  res.send('POST request to homepage');
});

module.exports = router;
