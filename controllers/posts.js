const Post = require('../models/posts');

module.exports = {
    index
}

function index(req, res) {
    res.render('posts/index', { title: 'All posts' });
}