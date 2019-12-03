var User = require('../models/user');
// var Performer = require('../models/performer');

module.exports = {
  index,
  show,
};

function index(req, res) {
   User.find({}, function(err, users) {
      res.render('users/index', { title: 'Users', users: users })
   });
}

//Note: even though req.user is set to the logged in user, sometimes the show button will be for people that are not the logged in user. Thus, I still use the findById and use req.params.id to find the user.
function show(req, res) {
  User.findById(req.params.id, function(err, user) {
    res.render('users/show', { title: 'Profile',
    user: user,
    loggedInUser: req.user });
  });
}

// function show(req, res) {
//   Movie.findById(req.params.id)
//   .populate('cast')
//   .exec(function(err, movie) {
//     Performer.find({
//       _id: {$nin: movie.cast}
//     }, function(err, performers) {

//     res.render('movies/show', { title: 'Movie Detail', movie, performers });
//     });
//   })
// }

// function newMovie(req, res) {
//   res.render('movies/new', { title: 'Add Movie' });
// }

// function create(req, res) {
//   // convert nowShowing's checkbox of nothing or "on" to boolean
//   req.body.nowShowing = !!req.body.nowShowing;
//   for (let key in req.body) {
//     if (req.body[key] === '') delete req.body[key];
//   }
//   var movie = new Movie(req.body);
//   movie.save(function(err) {
//     if (err) return res.redirect('/movies/new');
//     console.log(movie);
//     res.redirect(`/movies/${movie._id}`);
//   });
// }

// var Movie = require('../models/movie');

// module.exports = {
//   create
// };

// function create(req, res) {
//   Movie.findById(req.params.id, function(err, movie) {
//     movie.reviews.push(req.body);
//     movie.save(function(err) {
//       res.redirect(`/movies/${movie._id}`);
//     });
//   });
// }