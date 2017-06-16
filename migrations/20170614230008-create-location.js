'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      locationID: {
        type: Sequelize.INTEGER
      },
      locationName: {
        type: Sequelize.STRING
      },
      locationDescription: {
        type: Sequelize.TEXT
      },
      latLocation: {
        type: Sequelize.DECIMAL
      },
      longLocation: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Locations');
  }
};