const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, postsCtrl.index);
router.get('/new', ensureLoggedIn, postsCtrl.new);
router.get('/create', postsCtrl.create);
router.get('/:id', postsCtrl.show);
router.put('/:id', postsCtrl.update);
router.delete('/:id', ensureLoggedIn, postsCtrl.delete);

module.exports = router;
