const express = require("express");
var m = require("../models/index");

var CampQueries = {
  addUser:function(user,passWord) {
    return m.Profiles.create({
      email: user.email,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      imageURL: user.img,
      userCity:user.city,
      passWord: passWord
    })
  },
  getUserProfileByName:function(userEmail) {
    return m.Profiles.findAll({
            where: {
              email: userEmail
            }
          });
  },
  getUserProfileById:function(userid) {
    return m.Profiles.findAll({
            where: {
              id: userid
            }
          });
  },
  getUserTrails:function(userid) {
    return m.Profiles.findAll({
            where: {
              id: userid
            }
          });
  },
  getUserCampSites:function(userid) {
    return m.Profiles.findAll({
    where: {
      id: userid,
    },
    include: [{
Hey         where: {
          c_profileId: userid,
        }
      }]
    });
  },
  addlocation:function(locationData, userid) {
    return m.Location.create({
      locationName: locationData.name,
      locationDescription: locationData.description,
      latLocation: locationData.lat,
      longLocation: locationData.long,
      profileId: userid
    })
  },
  getUserLocations:function(userid) {
    return m.Location.findAll({
      attributes: ["id"],
      where: {
        profileId: userid
      }
    })
    .then(function(result) {
      console.log(result);
      return m.Resource.findAll({
        where:{
          locationid:1
        }
      })
    })
    .catch(function(e){
      console.log(e);
    });
  }
}

module.exports = CampQueries
