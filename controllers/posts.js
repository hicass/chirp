const Post = require('../models/posts');
const token = process.env.TWINWORD_TOKEN;

module.exports = {
    index,
    show,
    new: newPost,
    create,
    checkSentiment,
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
    const requestBody = await {
        content: req.query.content,
        user: req.user._id,
        userName: req.user.name,
        userAvatar: req.user.avatar
    }

    const sentiment = await checkSentiment(requestBody.content);
    if (sentiment.includes('joy')) {
        res.render('posts/new', { errorMessage: 'Sounds a little too chipper to be a Chirp, try something more negative...' });
    } else {
        try { 
            await Post.create(requestBody); 
            res.redirect('/posts');
        } catch {
            console.log(err);
            res.render('posts/new', { errorMsg: err.message });
        }
    }
}

async function checkSentiment(content) {
    const url = `https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/?text=${content}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': token,
            'X-RapidAPI-Host': 'twinword-emotion-analysis-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.emotions_detected;
    } catch (error) {
        console.error(error);
    }
}

async function deletePost(req, res) {
    try {
        const post = await Post.findOneAndDelete({
            '_id': req.params.id,
            'user': req.user.id
        });
        
        if (!post) return res.redirect('/posts');
    } catch (err) {
        console.log(err);
    }

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