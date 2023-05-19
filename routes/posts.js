const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /posts
router.get('/', ensureLoggedIn, postsCtrl.index);
// GET /posts/new
router.get('/new', ensureLoggedIn, postsCtrl.new);
// GET /posts/
router.get('/create', postsCtrl.create);
// GET /posts/:id
router.get('/:id', postsCtrl.show);
// PUT /posts/:id
router.put('/:id', postsCtrl.update);
// DELETE /posts/:id
router.delete('/:id', ensureLoggedIn, postsCtrl.delete);

module.exports = router;
