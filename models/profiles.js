// Requires  
var Sequelize = require ('sequelize');
var connection= require('../config/connection.js');

var Profiles = sequelize.define('profiles', {
	profileId: {
		type: Sequelize.INTEGER,
		omitNull: true,
		autoIncrement: true,
		primaryKey:true
	},
	userName:  {
		type: Sequelize.string,
		omitNull: true
	},
	userCity:  {
		type: Sequelize.string,
		omitNull: true
	},
	userZip:  {
		type: Sequelize.string,
		omitNull: true
	},
	aboutMe:  {
		type: Sequelize.text,
		omitNull: true
	},	
	email:  {
		type: Sequelize.string,
		omitNull: true
	},	
	imageURL:  {
		type: Sequelize.string,
	},
	twitterId:  {
		type: Sequelize.string,
	},
	facebookId:  {
		type: Sequelize.string,
	},
	snapchatId:  {
		type: Sequelize.string,
	},
	status:  {
		type: Sequelize.boolean, 
		allowNull: false, 
		defaultValue: true
	},
}); 

Profiles.sync();

var profiles = {
	
	all: function(cb) {
		Profiles.findall({}).then(function(response){
			cb(response);
		});
	},

	create: function(name,city,zip,aboutme,email,URL,twitter,facebooks,napchat,status,cb) {
		 Profiles.create({
		 userName:name,
		 userCity:city,
		 userZip:zip,
		 aboutMe:aboutme,
		 email:email,
		 imageURL:URL,
		 twitterID:twitter,
		 facebookId:facebook,
		 snapchatId:snapchat,
		 status:status
		 }).then(function() {
		 	cb();
		 }).catch(function(error) {
		 	cb(error);
		 });
	} // create  

}// Profile 

module.exports = profiles;
