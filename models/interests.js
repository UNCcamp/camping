'use strict';
module.exports = function(sequelize, DataTypes) {
  var Interests = sequelize.define('Interests', {
    interestID: DataTypes.INTEGER,
    interestName: DataTypes.STRING,
    interestDescription: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Interests.belongsTo(models.Profiles);
      }
    }
  });
  return Interests;
};