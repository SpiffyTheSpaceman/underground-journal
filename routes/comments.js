var express = require('express');
var router = express.Router();
var commentsCtrl = require('../controllers/comments');

function isLoggedIn(req, res, next) {
   if ( req.isAuthenticated() ) return next();
   res.redirect('/auth/google');
}

module.exports = router;

//POST for a new journal post.
router.post('/posts/:id/comments', isLoggedIn, commentsCtrl.create);
router.put('/posts/:id/comments/:index', isLoggedIn, commentsCtrl.update);
router.delete('/posts/:id/comments/:index', isLoggedIn, commentsCtrl.delete);
// router.put()