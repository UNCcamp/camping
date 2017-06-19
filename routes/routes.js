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
    if(req.headers.cookie) {
      var userid = cleanCookie(req)
      //this parses the cookie to get id from user
      query.getUserProfileById(userid)
      .then(function(userResult) {
        if(userResult) {
          query.getUserLocations(userid)
          .then(function(locResult){
             var imagesResult = handleBarsDataReady(locResult);
             res.render("ProfileMain", {
               imageURL: userResult[0].imageURL,
               firstName: userResult[0].firstName,
               lastName: userResult[0].lastName,
               userCity: userResult[0].userCity,
               aboutMe: userResult[0].aboutMe,
               campImages: imagesResult
              });
            // res.send(imagesResult);
          })
          .catch(function(e){
            console.log(e);
            res.status("500")
            .send("Error adding location");
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

router.get("/getLocations",function(req,res) {
  var userid = cleanCookie(req)
  if(userid !== "") {
    var locationData = {
      name: req.body.name,
      description: req.body.description,
      latLocation: req.body.latLocation,
      longLocation: req.body.longLocation
    }
    query.getUserLocations(userid)
    .then(function(result){
      console.log(result);
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

router.get("/mapkey",function(req, res) {

  res.status("200")
  .send(process.env.MAPBOXKEY);

});

function cleanCookie(req) {
  console.log(req.headers);
  console.log(process.env);
  if(req.headers.cookie.includes("user")) {
    if(process.env)
    var userid = req.headers.cookie.split(";")[1].split("=")[1];
    return userid;
  }
  return "";
}

function handleBarsDataReady(result) {
  var totalImages = result.length;
  const NUMOFCARA = 3; // really 4 just b/c array is at zero
  var countNextCar = 3;
  imageResult = [];
  var temp = [];
  for(var iter = 0; iter < totalImages; iter++) {
    var img = result[iter].url;
    temp.push(img)
      if((iter === countNextCar) || (iter === totalImages-1)) {
        imageResult.push(temp);
        temp = [];
    }
  }
  return imageResult
}
module.exports = router;
