const Post = require('../models/posts');

module.exports = {
    index,
    new: newPost,
    create
}

function index(req, res) {
    const posts = Post.find({});
    res.render('posts/index', { title: 'All posts', posts });
}

function newPost(req, res) {
    res.render('posts/new', { title: 'New Post'});
}

async function create(req, res) {
    console.log(req.body);
}
