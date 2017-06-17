'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Activities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      activityName: {
        type: Sequelize.STRING
      },
      activityDescription: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      profileId: {   // <- This is the new section to add
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Profiles',
          key: 'id',
          as: 'a_profileId'
        }
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Activities');
  }
};