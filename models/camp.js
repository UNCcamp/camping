// Requires  
var sequelize = require('sequelize');
var connection = require('../config/connection.js');

// Table Variable definitions 
var Profiles = connection.define('profiles', {
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
		type: Sequelize.string,
		omitNull: true
	},
}); // Profiles


var Interests = connection.define('interests', {
	interestId: {
		type: Sequelize.INTEGER,
		omitNull: true,
		autoIncrement: true,
		primaryKey:true
	},
	interestName:  {
		type: Sequelize.string,
		omitNull: true
	},
	interestDescription:  {
		type: Sequelize.text,
		omitNull: true
	}
}); // interests

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
}); // interests

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
	}

}); // inventory


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
	}
	latLocation: {
		type: Sequelize.decimal,
		omitNull: true,
		default: '1';
	}
	longLocation: {
		type: Sequelize.INTEGER,
		omitNull: true,
		default: '1';
	}	
}); // location


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

var LoadoutItems = connection.define('loadoutItems', {
	loadoutId: {
		type: Sequelize.INTEGER,
		omitNull: true,
		autoIncrement: true,
		primaryKey:true
	},
	itemQuantity: {
		type: Sequelize.INTEGER,
		omitNull: true,
		default: '1';
	}
}); // loadouts

// Sync all tables 

LoadoutItems.sync();
Loadouts.sync();
Location.sync();
Inventory.sync();
Activity.sync();
Interests.sync();
Profiles.sync();


// Functions //  

var profiles = {

all: function(cb) {
	profiles.findAll({}).then(function(response){
		cb(response);
		});
	},

create: function(user_name, cb) {
    Profiles.create({
      username: username;
      userCity:
      userState:
      userZip:
      aboutMe:
      emailName: 
      imageURL:
      twitterId:
      facebookID:
      snapchatId:
      status: 'A'

    }).then(function() {
      cb();
    }).catch(function(error) {
      // bonus - trap for there being no burger name field
      cb(error);
    });
  },

update: function(id, cb) {
	Profiles.update({


	});


} // Profile methods 



module.exports = profiles;
// module.exports = profiles;
// module.exports = profiles;
// module.exports = profiles;
// module.exports = profiles;