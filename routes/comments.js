const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

// POST /posts/:id/comments
router.post('/posts/:id/comments', commentsCtrl.create);
// DELETE /comments/:id
router.delete('/comments/:id', commentsCtrl.delete);

module.exports = router;