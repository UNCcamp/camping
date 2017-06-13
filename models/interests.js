// var Sequelize = require ('sequelize');
//
// var Interests = connection.define('interests', {
// 	interestId: {
// 		type: Sequelize.INTEGER,
// 		omitNull: true,
// 		autoIncrement: true,
// 		primaryKey:true
// 	},
// 	interestName:  {
// 		type: Sequelize.string,
// 		omitNull: true
// 	},
// 	interestDescription:  {
// 		type: Sequelize.text,
// 		omitNull: true
// 	},
// 	{
// 	classMethods: {
// 		associate: function(models){
// 			Interests.belongsTo(models.Profiles, {
//             foreignKey: {
//               allowNull: false
//             }
// 		 });
// 	  }
// 	}
// }); // interests
//
// Interests.sync;
//
// Interests.sync();
//
// var interests = {
// 	all: function(cb) {
// 		Interests.findall({}).then(function(response){
// 			cb(response);
// 		});
// 	},
// 	create: function(name,description,cb) {
// 		 Interests.create({
// 		 	interestName:name,
// 		 	interestDescription:description
// 		 }).then(function() {
// 		 	cb();
// 		 }).catch(function(error) {
// 		 	cb(error);
// 		 });
// 	} // create
//
// }// interests functions
//
// module.exports = interests;
