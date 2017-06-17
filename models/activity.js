'use strict';
module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define('Activity', {
    activityName: DataTypes.STRING,
    activityDescription: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
          Activity.belongsTo(models.Profiles,{
          foreignKey: 'a_profileId',
          onDelete: 'CASCADE'
        })
      }
    }
  });
  return Activity;
};