'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      profileID: {
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.STRING
      },
      passWord: {
        type: Sequelize.STRING
      },
      userCity: {
        type: Sequelize.STRING
      },
      userZip: {
        type: Sequelize.STRING
      },
      aboutMe: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.STRING
      },
      imageURL: {
        type: Sequelize.STRING
      },
      twitterId: {
        type: Sequelize.STRING
      },
      facebookId: {
        type: Sequelize.STRING
      },
      snapchatId: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('Profiles');
  }
};