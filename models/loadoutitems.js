'use strict';
module.exports = function(sequelize, DataTypes) {
  var LoadoutItems = sequelize.define('LoadoutItems', {
    itemName: DataTypes.STRING,
    itemQuantity: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
          Loadoutitems.belongsTo(models.Loadouts,{
          foreignKey: 'loadoutId',
          onDelete: 'CASCADE'
          })
      }
    }
  });
  return LoadoutItems;
};