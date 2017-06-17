'use strict';
module.exports = function(sequelize, DataTypes) {
  var Resource = sequelize.define('Resource', {
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Resource.belongsTo(models.Location,{
       foreignKey: 'a_locationId',
       onDelete: 'CASCADE'
     })
    }
  }
  });
  return Resource;
};
