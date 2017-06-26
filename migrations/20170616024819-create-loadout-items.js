'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('LoadoutItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemName: {
        type: Sequelize.STRING
      },
      itemQuantity: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
        loadoutId: {   // <- Foreign Key fromLoadout table
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Loadouts',
          key: 'id',
          as: 'loadoutId'
        }
      }
      //   inventoryId: {   // <- Foreign Key fromLoadout table
      //   type: Sequelize.INTEGER,
      //   onDelete: 'CASCADE',
      //   references: {
      //     model: 'Inventory',
      //     key: 'id',
      //     as: 'inventoryId'
      //   }
      // }

    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('LoadoutItems');
  }
};