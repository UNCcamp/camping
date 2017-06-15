'use strict';
module.exports = function(sequelize, DataTypes) {
  var Profiles = sequelize.define('Profiles', {
    profileID: DataTypes.INTEGER,
    userName: DataTypes.STRING,
    passWord: DataTypes.STRING,
    userCity: DataTypes.STRING,
    userZip: DataTypes.STRING,
    aboutMe: DataTypes.TEXT,
    email: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    twitterId: DataTypes.STRING,
    facebookId: DataTypes.STRING,
    snapchatId: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Profiles;
};