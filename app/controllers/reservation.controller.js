var Reservation = require('mongoose').model('Reservation');
var Restaurant = require('mongoose').model('Restaurant');

var reservationArray;
var restaurantDetail;

exports.render = function(req, res) {
  // Find Reservation
  /*Reservation.findOne({user_id: req.user._id, status: 'Waiting'}, function(err, reservations) {
    if (err) { console.log("ERROR"); }
    reservationArray = reservations;
    //reservationArray = reservations;
    //console.log("y" + reservationArray.time);

    // Find Restaurant Detail
    Restaurant.findOne({_id: reservations.restaurant_id}, function(err, restaurant_detail) {
      //console.log(restaurant_detail);
      restaurantDetail = restaurant_detail;
      // Render
      if (req.user) {
        if (req.user.access == 'User') {
          console.log("LOGGED IN AS USER");
          //console.log("OOOOOOOOOO" + restaurant_detail.name);
          console.log(reservationArray);
          console.log(restaurantDetail);
          res.render('user/reservation', {
            'title': 'Reservation',
            username: req.user.username,
            reservations: reservationArray,
            restaurant: restaurantDetail
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


    });
  });*/

  Reservation.aggregate([{
    $lookup: {
      from: "restaurants",
      localField: "restaurant_id",
      foreignField: "_id",
      as: "rest_detail"}
    }],
    function(err, res) {
      if (err) console.log("WWWW");
      else console.log("YEAH: " + res[0].rest_detail[0].name)
      
    }
  );


  if (req.user) {
    if (req.user.access == 'User') {
      console.log("LOGGED IN AS USER");
      //console.log("OOOOOOOOOO" + restaurant_detail.name);
      console.log(reservationArray);
      console.log(restaurantDetail);
      res.render('user/reservation', {
        'title': 'Reservation',
        username: req.user.username,
        reservations: reservationArray,
        restaurant: restaurantDetail
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
