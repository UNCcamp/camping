'use strict';
module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define('Activity', {
    activityID: DataTypes.INTEGER,
    activityName: DataTypes.STRING,
    activityDescription: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Activity.belongsTo(models.Profiles);
      }
    }
  });
  return Activity;
};