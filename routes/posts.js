const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');

// GET /posts
router.get('/', postsCtrl.index);
// POST /posts
router.get('/new', postsCtrl.new);


module.exports = router;
