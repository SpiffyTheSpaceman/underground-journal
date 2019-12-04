var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users')

/* GET users listing. */

router.get('/', usersCtrl.index);
router.get('/:id', usersCtrl.show);

/* PUT */
router.put('/:id', isLoggedIn, usersCtrl.update);

function isLoggedIn(req, res, next) {
   if ( req.isAuthenticated() ) return next();
   res.redirect('/auth/google');
 }
module.exports = router;
