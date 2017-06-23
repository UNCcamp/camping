const express = require("express");
query = require("../controllers/controller");
var router = express.Router();

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

router.post("/addlocation",function(req,res) {
  var userid = cleanCookie(req,res)
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


module.exports = router;
