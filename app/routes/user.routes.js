var passport = require('passport');

module.exports = function(app) {
  var user = require('../controllers/user.controller');
  var userinfo =  require('../controllers/userinfo.controller');
  //var store = require('../controllers/store.controller');
  // Signup
  app.route('/signup')
    .get(user.renderSignup)
    .post(user.signup);
  // Login [Use Passport auth]
  app.route('/login')
    .get(user.renderLogin)
    .post(passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    }));
  // logout
  app.post('/logout', user.logout);

  // Store
  //app.get('/store/init', store.init);
  //app.get('/store/:name', store.view);
  //app.param('name', store.name);

  app.post('/logout', user.logout);
  // if user send POST to /user, goto user.create
  app.route('/user')
    .post(user.create)
    .get(user.list);
    // if user send GET to /user/xxx, and xxx is param
  app.route('/user/:username')
    .get(user.read)
    .put(user.update)
    .delete(user.delete);
  // Populate username param and goto user.userByUsername
  app.param('username', user.userByUsername);


  app.get('/profile', user.renderProfile);


  app.get('/userjson', user.list);
  app.get('/userjson/:username', user.read);
}
