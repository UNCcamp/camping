const express = require("express");
var m = require("../models/index");

var CampQueries = {
  getUserProfile:function(userEmail) {
    return m.Profile.findAll({
            where: {
              userName: userEmail
            }
          });
  },
  getUserLocations:function(userID) {

  },
}
// function getUserLocations(userID) {
//   return m.Profile.findAll({
//           include:[{
//             model: Location,
//             where: {
//               id: userID
//             }
//           }]
//
//         });
//
// }


module.exports = CampQueries
