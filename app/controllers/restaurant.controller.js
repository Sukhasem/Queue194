var Restaurant = require('mongoose').model('Restaurant');
var Reservation = require('mongoose').model('Reservation');


exports.list = function(req, res, next) {
  Restaurant.find({}, function(err, restaurants) {
    console.log("LIST ALL RESTAURANT");
    res.json(restaurants);
  });
};

exports.view = function(req, res) {
  if (req.restaurant != null) console.log("FOUNDED");
  else console.log("NOT FOUNDED");
  res.json(req.restaurant);
};

exports.findByName = function(req, res, next, name) {
  console.log("SEARCHING");
  Restaurant.findOne({
    name: name
  }, function(err, restaurant) {
    if (err) {
      return next(err);
    } else {
      req.restaurant = restaurant;
      next();
    }
  });
};


exports.render = function(req, res) {
  console.log("LOADED RESTAURANT");
  console.log(req.restaurant);
  res.render('user/restaurant', {
    'title': 'User page',
    username: req.user.username,
    restaurant: req.restaurant
  });
};


exports.renderConfirmReserve = function(req, res) {
  console.log("LOADED COMFIRM RESERVING");
  console.log(req.restaurant);
  res.render('user/confirmreserve', {
    'title': 'Confirm',
    username: req.user.username,
    restaurant: req.restaurant
  });
};

exports.renderConfirmReserved = function(req, res) {
  console.log("LOADED COMFIRED RESERVATION");
  console.log(req.restaurant);
  /*res.render('user/confirmreserve', {
    'title': 'Confirm',
    username: req.user.username,
    restaurant: req.restaurant
  });*/
  // Insert Q
  var resv = new Reservation({
    restaurant_id: req.restaurant._id,
    user_id: req.user._id,
    seat: 2,
    time: '2099',
    status: 'Waiting'
  });
  resv.save(function(err, restaurants) {
    if (err) console.log('INSERTING ERROR' + err);
    else console.log('INSERTED: ' + restaurants);
  });

  res.redirect('/reservation');
};


exports.renderEditRestaurant = function(req, res) {
  console.log("QQQQQQQQQQQQQ");
  if (!req.user) {
    res.render('login', {
      title: 'Login',
      message: req.flash('error') || req.flash('info')
    });
  } else {
    res.render('owner/editrestaurant', {
      title: 'Edit',
      username: req.user.username
    });
  }
};


exports.renderManageQ  = function(req, res) {
  console.log("QQQQQQQQQQQQQ");
  if (!req.user) {
    res.render('login', {
      title: 'Login',
      message: req.flash('error') || req.flash('info')
    });
  } else {
    res.render('owner/manageq', {
      title: 'Manage Queue',
      username: req.user.username
    });
  }
};
