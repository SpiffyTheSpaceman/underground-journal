var User = require('../models/user');
var Post = require('../models/post');
 
function dateValue(rawDate) {
   var newDate = `${rawDate.getFullYear()}-${(rawDate.getMonth() + 1)
      .toString().padStart(2, "0")}-${rawDate.getDate().toString().padStart(2, "0")}T${rawDate
        .getHours()
        .toString()
        .padStart(2, "0")}:${rawDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
   return newDate;
};

function translateDate(date) {
   var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
   var weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
   var rawDate = new Date(date);
   var newDate = `${weeks[rawDate.getDay()].substr(0, 3)}, ${months[rawDate.getMonth()]} ${rawDate.getDate()}, ${rawDate.getFullYear()} at ${rawDate.getHours()}:${rawDate.getMinutes()}`;
   return newDate;
}

module.exports = {
   index,
   new: newPost,
   edit,
   create,
   update,
   delete: deletePost,
   showPosts,
};

function index(req, res) {
   Post.find({})
   .populate('owner')
   .populate('comments.owner')
   .exec(function(err, posts) {
      res.render('posts/index', {
         title: 'Underground Journal',
         loggedInUser: req.user,
         posts
      })
   })
}

function newPost(req, res) {
   var newPost = new Post();
   var currentDate = newPost.date;
   currentDate = dateValue(currentDate);
   res.render('posts/new', {
      title: 'New Journal Entry',
      loggedInUser: req.user,
      currentDate: currentDate,
   });
};

function edit(req, res) {
   Post.findById(req.params.id, function(err, post) {
      res.render('posts/edit', {
         post,
         loggedInUser: req.user,
         title: 'Edit Journal'
      })
   })
}

function update(req, res) {
   req.body.dateValue = req.body.date;
   req.body.dateTranslated = translateDate(req.body.dateValue);
   Post.findByIdAndUpdate(
      req.params.id, 
      req.body
   ).then(
     res.redirect(`/users/${req.user._id}/posts`)
   )
}

function create(req, res) {
   req.body.owner = req.user._id;
   req.body.dateValue = req.body.date;
   req.body.dateTranslated = translateDate(req.body.dateValue);
   Post.create(req.body)
   .then(res.redirect(`/users/${req.user._id}/posts`))
};

function deletePost(req, res) {
   Post.deleteOne({"_id": req.params.id}, function(err, post) {
      res.redirect(`/users/${req.user._id}/posts`);
    });
}


//Note that populate is another promise, so we need to wait for it to finish before we can render the page.
function showPosts(req, res) {
   User.findById(req.params.id, function(err, user) {
      Post.find({owner: user._id})
      .populate('comments.owner') 
      .exec(function(err, posts) {
         res.render('posts/showPosts', {
            title: 'My Entries',
            user,
            posts,
            loggedInUser: req.user
         })
      })
   })
}
