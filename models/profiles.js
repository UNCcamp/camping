'use strict';
module.exports = function(sequelize, DataTypes) {
  var Profiles = sequelize.define('Profiles', {
    userName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
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
        // associations with most of the other models
         Profiles.hasMany(models.Activity,{
          foreignKey: 'a_profileId',
          as: 'activity'
        }),
         Profiles.hasMany(models.Interests,{
          foreignKey: 'i_profileId',
          as: 'interests'
        }),
         Profiles.hasMany(models.Inventory,{
          foreignKey: 'v_profileId',
          as: 'inventorys'
        }),
         Profiles.hasMany(models.Loadouts,{
          foreignKey: 'o_profileId',
          as: 'loadouts'
        }),
         Profiles.hasMany(models.Locations,{
          foreignKey: 'c_profileId',
          as: 'locations'
        })
      }
    }
  });
  return Profiles;
};