var express = require('express');
var router = express.Router();
var postsCtrl = require('../controllers/posts');

router.post('/users/:id/posts', postsCtrl.create);

module.exports = router;