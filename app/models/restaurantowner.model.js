var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RestaurantOwnerSchema = new Schema({
  restaurant_id: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    unique: true,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

mongoose.model('RestaurantOwner', RestaurantOwnerSchema);
