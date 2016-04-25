var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserInfoSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    trim: true,
    required: 'User ID is invalid'
  },
  first_name: String,
  last_name: String,
  phone: String,
  city: String,
  conuntry: String,
  point: Number
});


// Create a model
mongoose.model('UserInfo', UserInfoSchema)
