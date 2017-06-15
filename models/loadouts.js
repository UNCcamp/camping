'use strict';
module.exports = function(sequelize, DataTypes) {
  var Loadouts = sequelize.define('Loadouts', {
    loadoutId: DataTypes.INTEGER,
    loadoutDescription: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Loadouts.belongsTo(models.Profiles);
      }
    }
  });
  return Loadouts;
};