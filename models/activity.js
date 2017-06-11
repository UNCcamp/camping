var Sequelize = require ('sequelize');
var connection= require('../config/connection.js');

var Activity = connection.define('activity', {
	activityId: {
		type: Sequelize.INTEGER,
		omitNull: true,
		autoIncrement: true,
		primaryKey:true
	},
	activityName:  {
		type: Sequelize.string,
		omitNull: true
	},
	activityDescription:  {
		type: Sequelize.text,
		omitNull: true
	}
},
	{
	classMethods: {
		associate: function(models){
			Activity.belongsTo(models.Profiles, {
            foreignKey: {
              allowNull: false
            }
		 });
	  }
	}
  }); // Activities

Activity.sync();

var activity = {
	all: function(cb) {
		Activity.findall({}).then(function(response){
			cb(response);
		});
	},

	create: function(activity, description, cb) {
		 Location.create({
		 	activityName: activity,
		 	activityDescription: description
		 }).then(function() {
		 	cb();
		 }).catch(function(error) {
		 	cb(error);
		 });
	} // create  

}// activity

module.exports = activity;