'use strict';
module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define('Location', {
    locationID: DataTypes.INTEGER,
    locationName: DataTypes.STRING,
    locationDescription: DataTypes.TEXT,
    latLocation: DataTypes.DECIMAL,
    longLocation: DataTypes.DECIMAL
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Location.belongsTo(models.Profiles);
      }
    }
  });
  return Location;
};

