var passport = require('passport');
var User= require('../models/user');

// passport has different "strategies" for handling Oauth of different kinds. we want to require the google oauth strategy.
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//We can access our .env via process.env.varName
passport.use(new GoogleStrategy({
   clientID: process.env.GOOGLE_CLIENT_ID,
   clientSecret: process.env.GOOGLE_SECRET,
   callbackURL: process.env.GOOGLE_CALLBACK
 },
 function(accessToken, refreshToken, profile, cb) {
   // a user has logged in with OAuth...
   //We need to: fetch the user from the database and provide them back to Passport by calling the cb callback method, or...
   //If the user does not exist, we have a new user! We will add them to the database and pass along this new user in the cb callback method.
   //profile will contain the user's google id. We need to store their google Id as part of our own users Model so that we can verify if the user already exists.
   User.findOne({ 'googleId': profile.id }, function(err, user) {
      //if error do nothing.
      //NOTE: cb can be called anything in the parameters.
      if (err) return cb(err);
      //if user already exists, just return the user.
      if (user) {
        return cb(null, user);
      } else {
        // if user doesn't exist in db, make a new user.
        //NOTE: profile.emails returns an array incase the person has a linked email. Thus we just want the main email which is in index 0.
        var newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
        newUser.save(function(err) {
          if (err) return cb(err);
          return cb(null, newUser);
        });
      }
    });
 }
));
//the cb method will cause serializeUser to run if there is no error in cb.
//basically serializeuser will input in the user into the user parameter (which it knows because the cb function above returns the user). By the done method, we are inputting the user.id into the session.
passport.serializeUser(function(user, done) {
   //NOTE: done can be called anything in the parameter. We just need to call it. done will then call deserializeUser.
   done(null, user._id);
});
//deserializeUser will input in the data in the session that was inputted by serializeUser (which in this case is the userId) into the first parameter: id. We will then find the student by that id.
passport.deserializeUser(function(id, done) {
   Student.findById(id, function(err, user) {
      //As long as there is no err, done will set req.user === user.
      done(err, user);
   })
});