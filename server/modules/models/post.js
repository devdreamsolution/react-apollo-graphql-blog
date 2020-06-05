const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    author_id: String,
    title: String,
    content: String,
    like_count: Number,
    comments: [Object],
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
    publish: Boolean,
    tags: [String],
    categories: [String],
    postImage: String,
    slug: String,
});

const Post = model('post', postSchema);

module.exports = Post;