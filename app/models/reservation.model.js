var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReservationSchema = new Schema({
  restaurant_id: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seat: {
    type: Number,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    // Validator - check for role must be 1 of 3 enum
    enum: ['Done', 'Waiting']
  }
});


mongoose.model('Reservation', ReservationSchema);
