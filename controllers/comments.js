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

module.exports = {
   create,
   delete: deleteComment
};

function create(req, res) {
   Post.findById((req.params.id), function(err, user) {
      req.body.index = user.comments.length;
      req.body.owner = req.user._id
      user.comments.push(req.body);
      user.save(function(err) {
         res.redirect(`/posts`);
      });
   });
};


function deleteComment(req, res) {
   Post.findById((req.params.id), function(err, post) {
      post.comments.splice(req.params.index, 1);
      post.comments.forEach((comment, index) => {
         comment.index = index;
      });
      post.save(function(err) {
         res.redirect(`/posts`);
       });
   });
}