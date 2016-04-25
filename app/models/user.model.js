var mongoose = require('mongoose');
var crypto = require('crypto');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    //required: true
    required: 'Username is Required'
  },
  email: {
    type: String,
    index: true,
    match: /.+\@.+\.+/
  },
  password: {
    type: String,
    validate: [
      function(password) {
        return password && password.length >= 6;
      }, 'Password must be at least 6 characters'
    ]
  },
  salt: {
    type: String
  },
  // Strategy that you register
  provider: {
    type: String,
    required: 'Provider is required'
  },
  // User ID that get from Provider
  providerId: String,
  // Store OAuth provider data
  providerData: {},
  access: {
    type: String,
    // Validator - check for role must be 1 of 3 enum
    enum: ['User', 'Owner', 'Admin']
  },
  created: {
    type: Date,
    default: Date.now
  }
});


// What you do before saving [for check hash password]
UserSchema.pre('save', function(next) {
  if (this.password) {
    // Buffer use for keeping raw data
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }
  next();
});

// Create instant method
UserSchema.methods.hashPassword = function(password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};
// Check hashPassword and input password
UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};

// Create a model
mongoose.model('User', UserSchema)
