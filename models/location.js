var Sequelize = require ('sequelize');
var connection= require('../config/connection.js');

var Location = connection.define('location', {
	locationId: {
		type: Sequelize.INTEGER,
		omitNull: true,
		autoIncrement: true,
		primaryKey:true
	},

	locationName:  {
		type: Sequelize.string,
		omitNull: true
	},

	locationDescription:  {
		type: Sequelize.text,
		omitNull: true
	},
	latLocation: {
		type: Sequelize.decimal,
		omitNull: true,

	},
	longLocation: {
		type: Sequelize.decimal,
		omitNull: true,
	},
	{
	classMethods: {
		associate: function(models){
			Location.belongsTo(models.Profiles, {
            foreignKey: {
              allowNull: false
            }
		 });
	  }
	}	
}); // location

Location.sync(); // Syncs to the DB

// Display all, create and Update functions

var location = {
	all: function(cb) {
		Location.findall({}).then(function(response){
			cb(response);
		});
	},

	create: function(lName,lDes,laLoc,loLoc, cb) {
		 Location.create({
		 	locationName: lName,
		 	locationDescription: lDes,
		 	latLocation: laLoc,
		 	longLocation: loLoc
		 }).then(function() {
		 	cb();
		 }).catch(function(error) {
		 	cb(error);
		 });
	} // create  

}// location functions 

module.exports = location;
