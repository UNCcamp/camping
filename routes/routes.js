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

router.get("/profile",function (req, res) {
     var userid = cleanCookie(req)
    if(userid !=="") {
      //this parses the cookie to get id from user
      var userid = req.headers.cookie.split(";")[1].split("=")[1];
      query.getUserProfileById(userid)
      .then(function(result){
        if(result) {
          res.render("ProfileMain", {
            imageURL: result[0].imageURL,
            firstName: result[0].firstName,
            lastName: result[0].lastName,
            userCity: result[0].userCity,
            aboutMe: result[0].aboutMe,

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

router.post('/adduser', function(req, res) {
  var user = req.body;
  try {
    auth.hashPass(user.pass,function(result) {
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

router.post("/addlocation",function(req,res) {
  var userid = cleanCookie(req)
  if(userid !== "") {
    var locationData = {
      name: req.body.name,
      description: req.body.description,
      latLocation: req.body.latLocation,
      longLocation: req.body.longLocation
    }
    query.addLocation(locationData,userid)
    .then(function(result){
      res.status("201")
      .send("Location added");
    })
    .catch(function(e){
      res.status("500")
      send("Error adding location");
    });
  }
});

router.post("/getLocation",function(req,res) {
  var userid = cleanCookie(req)
  if(userid !== "") {
    var locationData = {
      name: req.body.name,
      description: req.body.description,
      latLocation: req.body.latLocation,
      longLocation: req.body.longLocation
    }
    query.addLocation(locationData,userid)
    .then(function(result){
      res.status("201")
      .send("Location added");
    })
    .catch(function(e){
      res.status("500")
      send("Error adding location");
    });
  }
});

router.get("/login", function (req, res) {
    res.render("modalLogin");
});


router.get("/trail", function (req, res) {
    res.render("TrailResult");
});

function cleanCookie(req) {
  if(req.headers.cookie.includes("user")) {
    var userid = req.headers.cookie.split(";")[1].split("=")[1];
    return userid;
  }
  return "";
}
module.exports = router;
