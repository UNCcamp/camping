var Sequelize = require ('sequelize');

var Loadouts = connection.define('loadouts', {
	loadoutId: {
		type: Sequelize.INTEGER,
		omitNull: true,
		autoIncrement: true,
		primaryKey:true
	},
	loadoutDescription:  {
		type: Sequelize.text,
		omitNull: true
	}
}); // loadouts

Loadouts.sync();

var loadouts = {
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

}// loadouts functions

module.exports = loadouts;
