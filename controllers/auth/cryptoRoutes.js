const express = require("express");
var router = express.Router();
var auth = require("./authCode");


function authenticate(usr,pass) {
  var username = usr;
  var pass = pass;
  if((auth.decrypt(/*from server **/)) === pass) {
    req.session.userAuth = userId;
}

router.post('/login', function (req, res) {

    res.redirect("/profile");
  }
  res.status(401)        // HTTP unauthorized
  .send('Not authorized');
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
