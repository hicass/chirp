const Post = require('../models/posts');

module.exports = {
    index,
    show,
    new: newPost,
    create,
    delete: deletePost,
    update
}

async function index(req, res) {
    const posts = await Post.find({});
    res.render('posts/index', { title: 'All Posts', posts });
}

async function show(req, res) {
    const post = await Post.findById(req.params.id);
    console.log(post);
    res.render('posts/show', {title: 'Users Post', post});
}

function newPost(req, res) {
    res.render('posts/new', { title: 'New Post'});
}

async function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    try {
        await Post.create(req.body);
        res.redirect('/posts');
    } catch (err) {
        console.log(err);
        res.render('posts/new', { errorMsg: err.message });
    }
}

async function deletePost(req, res) {
    console.log('post id:', req.params.id)
    const post = await Post.findOneAndDelete({
        '_id': req.params.id,
        'user': req.user.id
    });
    if (!post) return res.redirect('/posts');
    res.redirect('/posts');
}

async function update(req, res) {
    const post = await Post.findById(req.params.id);
    try {
    await Object.assign(post, req.body);
    await post.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect('/posts');
}
