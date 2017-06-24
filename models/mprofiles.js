var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Backpack = new Schema({
  name: String,
  description: String,
  URL: String,
  inventoryItems: [Number]
});

module.exports = function() {
var Profile = new Schema({
  username:  String,
  firstname: String,
  lastname:   String,
  password:  String,
  userCity: String,
  userZip:   String,
  aboutMe: String,
  backpacks:[Backpack],   
  locations: [number],
  inventory:[number],
  email: String,
  imageURL:String,
  twitterId:String,
  facebookId:String,
  snapchatId:String,
  status: Boolean
});
return Profile;
}