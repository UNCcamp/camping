'use strict';
module.exports = function(sequelize, DataTypes) {
  var Interests = sequelize.define('Interests', {
    interestName: DataTypes.STRING,
    interestDescription: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
          Interests.belongsTo(models.Profiles,{
          foreignKey: 'i_profileId',
          onDelete: 'CASCADE'
        }) // associations can be defined here
      }
    }
  });
  return Interests;
};