var Sequelize = require ('sequelize');
var connection= require('../config/connection.js');

var Inventory = connection.define('inventory', {
	inventoryId: {
		type: Sequelize.INTEGER,
		omitNull: true,
		autoIncrement: true,
		primaryKey:true
	},
	itemName:  {
		type: Sequelize.string,
		omitNull: true
	},
	itemDescription:  {
		type: Sequelize.text,
		omitNull: true
	}
	itemQuantity: {
		type: Sequelize.INTEGER,
		omitNull: true,
		default: '1';
	},
	{
	classMethods: {
		associate: function(models){
			Inventory.belongsTo(models.Profiles, {
            foreignKey: {
              allowNull: false
            }
		 });
	  }
	}

}); // inventory

Inventory.sync();

var inventory = {
	all: function(cb) {
		Loadouts.findall({}).then(function(response){
			cb(response);
		});
	},

	create: function(description, cb) {
		 Location.create({
		 	loadoutDescription: description
		 }).then(function() {
		 	cb();
		 }).catch(function(error) {
		 	cb(error);
		 });
	} // create  	

}// loadoutn functions 

module.exports = inventory;