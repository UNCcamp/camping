const express = require("express");
var m = require("../models/index");

var CampQueries = {
  getUserProfileByName:function(userEmail) {
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
  getUserProfileById:function(userid) {
    return m.Profiles.findAll({
            where: {
              id: userid
            }
          });
  }
}

module.exports = CampQueries
