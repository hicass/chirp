const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    content: { 
        type: String, 
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: String,
    userAvatar: String,
    // comments: [commentSchema]
}, {
    timestamps: true
});

// const commentSchema = new Schema({
//     content: {
//         type: String,
//         required: true
//     },
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     userName: String,
//     userAvatar: String
// });

module.exports = mongoose.model('Post', postSchema);