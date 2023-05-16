const express = require('express');
const router = express.Router();
const passport = require('passport');
const Post = require('../models/posts');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const posts = await Post.find({});
  res.render('index', { title: 'Welcome / Chirp', posts });
});

router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/posts',
    failureRedirect: '/posts'
  }
));

router.get('/logout', function(req, res) {
  req.logout(function() {
    res.redirect('/')
  })
})

module.exports = router;
