var Store = require('mongoose').model('Restaurant');

exports.init = function(req, res, next) {
  var store = new Store({"name": "Riverside", "description": "yo", "queue": 0});

  store.save(function(err) {
    if (err) return next(err);
    else res.json(store);
  });
};

exports.name = function(req, res, next, name) {
  Store.findOne({
    // Database Field Username == Input Username
    name: name
  }, function(err, store) {
    if (err) {
      return next(err);
    } else {
      req.store = store;
      next();
    }
  });
};
exports.view = function(req, res) {
  res.json(req.store);
};
