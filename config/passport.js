var passport = require('passport');
var mongoose = require('mongoose');

module.exports = function() {
  var User = mongoose.model('User');

  // Set cookie to client [User id]
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  // Check cookie and id in database
  passport.deserializeUser(function(id, done) {
    User.findOne({_id: id }, '-password -salt', function(err, user) {
      done(err, user);
    });
  });

  // Use LocalStrategy in passport
  require('./strategies/local.js')();
};
