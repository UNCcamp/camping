var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = function() {

var inventory = new Schema({
  name:  String,
  cost: Number,
  description: String,
  URL: string,
});
return Inventory;
}