const express = require("express");
var query = require("../controllers/controller")
var auth = require("../controllers/auth/cryptoRoutes");
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
    if(req.headers.cookie.includes("user")) {
      //this parses the cookie to get id from user
      var userid = req.headers.cookie.split(";")[1].split("=")[1];
      query.getUserProfileById(userid)
      .then(function(result){
        if(result) {
          res.render("ProfileMain", {
            imageURL: result[0].imageURL
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
    }
    else {
      res.render("modalLogin");
    }
});

router.post("/authenticate",function(req,res) {
  console.log(req.body);
  var email = req.body.email;
  var pass = req.body.pass;
  query.getUserProfileByName(email)
  .then(function(result) {
    auth.authenticate(result[0].passWord,pass, function(isAuth){
      if(isAuth) {
        res.cookie('user', result[0].id, { expires: new Date(Date.now() + 36000000), httpOnly: true });
        res.status("200")
        .send("OK");
      }
      else {
        res.status("401")        // HTTP unauthorized
        .send("Not authorized");
      }
    });
  })
  .catch(function(e){
    console.log(e);
  });
});

router.post('/adduser', function (req, res) {
  var user = req.body;
  try {
    auth.hashPass(user.passWord,function(result) {
      query.addUser(user,result)
      .then(function() {
        res.status("201")
        .send("User added");
      })
      .catch(function() {
        res.status("500")
        .send("Error adding user");
      });
    });
  }
  catch(e) {
    console.log(e);
    res.status("500")
    .send("Error occured");
  }
});

router.post('/updateuser', function (req, res) {
  res.send('POST request to homepage');
});


router.get("/login", function (req, res) {
    res.render("modalLogin");
});


router.get("/trail", function (req, res) {
    res.render("TrailResult");
});

module.exports = router;
