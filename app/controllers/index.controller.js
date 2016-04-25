var Restaurant = require('mongoose').model('Restaurant');

var restaurantArray;

// Get Restaurant list
Restaurant.find({}, function(err, restaurants) {
  console.log("LIST ALL RESTAURANT: " + restaurants);
  restaurantArray = restaurants;
  //res.json(restaurants);
});

exports.render = function(req, res) {
  console.log("FUCK" + restaurantArray);
  // Render from Jade config - app/views/index.jade
  // Go to index page by User's role
  console.log(req.user);
  if (req.user) {
    if (req.user.access == 'User') {
      console.log("LOGGED IN AS USER");
      res.render('user/index', {
        'title': 'User page',
        username: req.user.username,
        restaurants: restaurantArray
      });
    } else if (req.user.access == 'Owner') {
      console.log("LOGGED IN AS OWNER");
      res.render('owner/index', {
        'title': 'Owner page',
        username: req.user.username
      });
    } else {
      console.log("ERROR: Unknown User's access");
      res.render('index', {
        'title': 'Welcome'
      });
    }
  } else {
    console.log("ANNONYMOUS");
    res.render('index', {
      'title': 'Welcome'
    });
  }
};
