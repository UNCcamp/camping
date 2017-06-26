'use strict';
module.exports = function(sequelize, DataTypes) {
  var Inventory = sequelize.define('Inventory', {
    itemName: DataTypes.STRING,
    itemDescription: DataTypes.TEXT,
    itemQuantity: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
          Inventory.belongsTo(models.Profiles,{
          foreignKey: 'v_profileId',
          onDelete: 'CASCADE'
        })
        //   , 
        // // associations can be defined here
        //   Inventory.hasMany(models.Loadoutitems,{
        //   foreignKey: 'inventoryId',
        //   as: 'loadoutitems'
        // })
      }
    }
  });
  return Inventory;
};