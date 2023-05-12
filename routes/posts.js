const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');

// GET /posts
router.get('/', postsCtrl.index);
// GET /posts/new
router.get('/new', postsCtrl.new);
// POST /posts
router.post('/', postsCtrl.create);

module.exports = router;
