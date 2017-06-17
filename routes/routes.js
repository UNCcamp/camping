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

router.post("/authenticate",function(req,res) {
  var email = req.body.email;
  var pass = req.body.pass;
  query.getUserProfile(email)
  .then(function(result) {
    auth.authenticate(result[0].passWord,pass, function(isAuth){
      if(isAuth) {
        res.redirect("/profile");
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
