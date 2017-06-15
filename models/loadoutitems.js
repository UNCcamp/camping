'use strict';
module.exports = function(sequelize, DataTypes) {
  var LoadoutItems = sequelize.define('LoadoutItems', {
    loadoutId: DataTypes.INTEGER,
    inventoryId: DataTypes.INTEGER,
    itemQuantity: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
      LoadoutItems.belongsTo(models.Inventory);
      }
    }
  });
  return LoadoutItems;
};