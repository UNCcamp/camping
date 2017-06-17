'use strict';
module.exports = function(sequelize, DataTypes) {
  var Resource = sequelize.define('Resource', {
    img: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
          Resource.belongsTo(models.Location,{
          foreignKey: 'resourceId',
          onDelete: 'CASCADE'
        }) // associations can be defined here
      }
    }
  });
  return Resource;
};
