var config = require('./config');
var mongoose = require('mongoose');

module.exports = function() {
  // Show log when have Database activity
  mongoose.set('debug', config.debug);
  var db = mongoose.connect(config.mongoUri);

  // Using model
  require('../app/models/user.model');
  require('../app/models/userinfo.model');
  require('../app/models/restaurant.model');
  require('../app/models/restaurantowner.model');
  require('../app/models/reservation.model');

  return db;
}
