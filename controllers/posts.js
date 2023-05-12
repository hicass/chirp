const Post = require('../models/posts');

module.exports = {
    index,
    new: newPost,
    create
}

async function index(req, res) {
    const posts = await Post.find({});
    //console.log(Post);
    console.log(posts);
    res.render('posts/index', { title: 'All posts', posts });
}

function newPost(req, res) {
    res.render('posts/new', { title: 'New Post'});
}

async function create(req, res) {
    console.log(req.body);
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    try {
        const posts = await Post.create(req.body);
        res.redirect('posts');
    } catch (err) {
        console.log(err);
        res.render('posts/new', { errorMsg: err.message });
    }
}
