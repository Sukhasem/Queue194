var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: 'Restaurant name is required'
  },
  description: {
    type: String
  }
});


// Create a model
mongoose.model('Restaurant', RestaurantSchema)
