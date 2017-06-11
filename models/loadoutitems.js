var Sequelize = require ('sequelize');
var connection= require('../config/connection.js');

var LoadoutItems = connection.define('loadoutItems', {
	loadoutId: {
		type: Sequelize.INTEGER,
		omitNull: true,
		primaryKey:true
	},
	inventoryId:  {
		type: Sequelize.INTEGER,
		omitNull: true
	}
	itemQuantity: {
		type: Sequelize.INTEGER,
		omitNull: true
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
	
}); // loadouts

LoadoutItems.sync();

var loadoutItems = {

	all: function(cb) {
		LoadoutItems.findall({}).then(function(response){
			cb(response);
		});
	},

	create: function(lid,inid,quantity, cb) {
		 Location.create({
		 	loadoutId:lid,
		 	inventoryId:inid,
		 	itemQuantity:quantity,
		 }).then(function() {
		 	cb();
		 }).catch(function(error) {
		 	cb(error);
		 });
	} // create  

}// loadout

module.exports = loadoutItems;