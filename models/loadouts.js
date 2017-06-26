'use strict';
module.exports = function(sequelize, DataTypes) {
  var Loadouts = sequelize.define('Loadouts', {
    loadoutDescription: DataTypes.TEXT,
    img:DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
         Loadouts.belongsTo(models.Profiles,{
          foreignKey: 'o_profileId',
          onDelete: 'CASCADE'
        }), // associations can be defined here
          Loadouts.hasMany(models.Locationpix,{
          foreignKey: 'loadoutId',
          as: 'loadoutitems'
        }) // associations can be defined here
      }
    }
  });
  return Loadouts;
};
