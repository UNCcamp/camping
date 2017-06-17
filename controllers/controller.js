const express = require("express");
var m = require("../models/index");

var CampQueries = {
  getUserProfile:function(userEmail) {
    return m.Profiles.findAll({
            where: {
              email: userEmail
            }
          });
  },
  addUser:function(user,passWord) {
    return m.Profiles.create({
      userName: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      passWord: passWord
    })
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
