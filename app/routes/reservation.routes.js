module.exports = function(app) {
  var reservation = require('../controllers/reservation.controller');

  app.get('/reservation', reservation.render);
}
