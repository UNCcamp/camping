const express = require("express");
var m = require("../models/index");

var CampQueries = {
  addUser:function(user,passWord) {
    return m.Profiles.create({
      userName: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
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
        model: m.Location,
        where: {
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
}

module.exports = CampQueries
