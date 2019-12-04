var User = require('../models/user');
var Post = require('../models/post');
 
module.exports = {
   new: newPost,
   create,
   showPosts
};

function newPost(req, res) {
   var newPost = new Post();
   var currentDate = newPost.date;
   currentDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
   .toString().padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}T${currentDate
     .getHours()
     .toString()
     .padStart(2, "0")}:${currentDate
     .getMinutes()
     .toString()
     .padStart(2, "0")}`
   console.log(currentDate);
   res.render('posts/new', {
      title: 'New Journal Entry',
      loggedInUser: req.user,
      currentDate: currentDate,
   });
};

function create(req, res) {
   req.body.owner = req.user._id;
   Post.create(req.body, function(err, performer) {
      res.redirect(`/users/${req.user._id}/posts`);
   });
};

function showPosts(req, res) {
   
}