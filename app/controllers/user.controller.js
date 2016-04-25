var User = require('mongoose').model('User');

// [HEAD] Create User function (CRUD)
exports.create = function(req, res, next){
  // Create User by user input
  var user = new User(req.body);

  // Save data to Database
  user.save(function(err){
    if (err) {
      return next(err);
    } else {
      // Success Saving and send a input to next form
      res.json(user);
    }
  });
};
// [HEAD] Read User function (CRUD)
// Listing
exports.list = function(req, res, next) {
  // Select User
  // find({condition}, [Field], [Option], function(err, users))
  // condition - $gt is greater than, $in is in
  // ex) age: {$lt: 20}
  // ex) interests: {$in: ['reading', 'eating']}
  // or use find by Query Builder
  // ex) User.find({ firstName: 'Parn'}).where('age').gt(18).lt(60).where('interest').in(['reading', 'eating'])
  // .skip(10).limit(10).select('username email').exec(function(err, users)) { ... }
  //
  // original { username: 'parn'}, 'username email', {skip:10, limit:10},
  User.find({}, function(err, users) {
    if (err) {
      return nect(err);
    } else {
      res.json(users);
    }
  });
};
// [HEAD] Read User function (CRUD)
// finding only one
exports.userByUsername = function(req, res, next, username) {
  User.findOne({
    // Database Field Username == Input Username
    username: username
  }, function(err, user) {
    if (err) {
      return next(err);
    } else {
      req.user = user;
      next();
    }
  });
};
exports.read = function(req, res) {
  res.json(req.user);
};
// [HEAD] Update Database
// update if username == username from input
exports.update = function(req, res, next) {
  User.findOneAndUpdate({username: req.user.username}, req.body,
  function(err, user) {
    if (err) {
      return next(err);
    } else {
      res.json(user);
    }
  });
};
// [HEAD] Delete Database
exports.delete = function(req, res, next) {
  req.user.remove(function(err){
    if (err) {
      return next(err);
    } else {
      res.json(req.user);
    }
  });
};




exports.logout = function(req, res) {
  console.log('LOGGING OUT');
  req.logout();
  res.redirect('/');
};


// Render Signup
exports.renderSignup = function(req, res) {
  if (!req.user) {
    res.render('signup', {
      title: 'Sign up',
      message: req.flash('error')
    });
  } else {
    return res.redirect('/');
  }
};

// Process Signup
exports.signup = function(req, res, next) {
  // Passport will attach User when logging in success
  if (!req.user) {
    var user = new User(req.body);
    user.provider = 'local';
    user.access = 'User';
    // Save user to database
    user.save(function(err) {
      // if error, back to signup page
      if (err) {
        // Error from Mongoose
        var message = getErrorMessage(err);
        // store message in flash
        req.flash('error', message);
        return res.redirect('/signup');
      }
      req.login(user, function(err) {
        if (err) return next(err);
        // Success
        return res.redirect('/');
      });
    });
  } else {
    // Logged in
    return res.redirect('/');
  }
};

var getErrorMessage = function(err) {
  var message = '';

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    // Validation error
    for (var errName in err.errors) {
      if (err.errors[errName].message) {
        message = err.errors[errName].message;
      }
    }
  }
  return message;
}


// Render Login
exports.renderLogin = function(req, res) {
  if (!req.user) {
    res.render('login', {
      title: 'Login',
      message: req.flash('error') || req.flash('info')
    });
  } else {
    return res.redirect('/');
  }
};

// Render Profile
exports.renderProfile = function(req, res) {
  if (!req.user) {
    res.render('login', {
      title: 'Login',
      message: req.flash('error') || req.flash('info')
    });
  } else {
    res.render('user/profile', {
      title: 'Profile',
      username: req.user.username
    });
  }
};
