var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = function() {
var Location = new Schema({
  name: String,
  cost: Number,
  description: String,
  URL: String,
  lattitude: String, 
  longditude: String
});
return Inventory;
}