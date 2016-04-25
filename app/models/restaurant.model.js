var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: 'Restaurant name is required'
  },
  description: {
    type: String,
    required: true
  }
});


mongoose.model('Restaurant', RestaurantSchema);
