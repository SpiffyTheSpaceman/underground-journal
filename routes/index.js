var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Underground Journal', loggedInUser: req.user });
});

//This passport method will take care of the google oatuh.
//I will need an <a> tag that directs to this route and passport.authenticate will take care of authentication.
router.get('/auth/google', passport.authenticate(
  'google', //Specifying that we want to authneticate with the google strategy.
  { scope: ['profile', 'email'] } //Specifying that we want access/to get the profile and email.
));

 // Google OAuth callback route, basically this is what will run after authentication. The passport.js config set it so the callback url will be /oauth2callback. 
 router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/',
    failureRedirect : '/'
  }
));

//This is our logout route. Note passport gives us req.logout to use and it will take care of everything necessary to logout.
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
