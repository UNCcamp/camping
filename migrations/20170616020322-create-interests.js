'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Interests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      interestName: {
        type: Sequelize.STRING
      },
      interestDescription: {
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
          as: 'i_profileId'
        }
      }

    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Interests');
  }
};