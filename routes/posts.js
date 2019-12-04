var express = require('express');
var router = express.Router();
var postsCtrl = require('../controllers/posts');

function isLoggedIn(req, res, next) {
   if ( req.isAuthenticated() ) return next();
   res.redirect('/auth/google');
 }
//GET new page for new journal entries.
router.get('/posts/new', postsCtrl.new);
//GET page for all a user's posts.
router.get('/users/:id/posts', postsCtrl.showPosts)

//POST for a new journal post.
router.post('/posts', isLoggedIn, postsCtrl.create);

module.exports = router;