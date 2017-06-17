'use strict';
module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define('Location', {
    locationName: DataTypes.STRING,
    locationDescription: DataTypes.TEXT,
    latLocation: DataTypes.DECIMAL,
    longLocation: DataTypes.DECIMAL
  }, {
    classMethods: {
      associate: function(models) {
          Location.belongsTo(models.Profiles,{
          foreignKey: 'c_profileId',
          onDelete: 'CASCADE'
        })
      }
    }
  });
  return Location;
};