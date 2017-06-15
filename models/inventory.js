'use strict';
module.exports = function(sequelize, DataTypes) {
  var Inventory = sequelize.define('Inventory', {
    inventoryID: DataTypes.INTEGER,
    itemName: DataTypes.STRING,
    itemDescription: DataTypes.TEXT,
    itemQuantity: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Inventory.belongsTo(models.Profiles);
      }
    }
  });
  return Inventory;
};