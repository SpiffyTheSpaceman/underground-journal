var express = require('express');
var router = express.Router();
var postsCtrl = require('../controllers/posts');

function isLoggedIn(req, res, next) {
   if ( req.isAuthenticated() ) return next();
   res.redirect('/auth/google');
 }


//GET page for all a user's posts.
router.get('/users/:id/posts', postsCtrl.showPosts)
//GET new page for new journal entries.
router.get('/posts/new', postsCtrl.new);
//GET page for all posts.
router.get('/posts', postsCtrl.index);
//GET page to edit posts
router.get('/posts/:id/edit', isLoggedIn, postsCtrl.edit);


//POST for a new journal post.
router.post('/posts', isLoggedIn, postsCtrl.create);

//PUT for updating journal post.
router.put('/posts/:id', isLoggedIn, postsCtrl.update);

//DELETE for posts
router.delete('/posts/:id', isLoggedIn, postsCtrl.delete);

module.exports = router;