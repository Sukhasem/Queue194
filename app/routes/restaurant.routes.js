//var passport = require('passport');

module.exports = function(app) {
  var restaurant = require('../controllers/restaurant.controller');

  app.get('/restaurant/:name', restaurant.render);
  app.get('/restaurant/reserving/:reserve', restaurant.renderConfirmReserve);
  app.get('/restaurant/reserving/confirm/:reserve', restaurant.renderConfirmReserved);

  app.get('/restaurantjson', restaurant.list);
  app.get('/restaurantjson/list', restaurant.list);
  app.get('/restaurantjson/:name', restaurant.view);

  app.param('name', restaurant.findByName);
  app.param('reserve', restaurant.findByName);



  // owner
  app.get('/ownrestaurant/edit', restaurant.renderEditRestaurant);
  app.get('/ownrestaurant/manageq', restaurant.renderManageQ);
}
