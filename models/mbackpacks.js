var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = function() {

var Backpack = new Schema({
  name: String,
  description: String,
  URL: String,
  inventoryItems: [Number]
});
return Backpack;
}