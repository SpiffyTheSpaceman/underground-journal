var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users')

/* GET users listing. */

router.get('/', usersCtrl.index);
router.get('/:id', usersCtrl.show);


module.exports = router;
