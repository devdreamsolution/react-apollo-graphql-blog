const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    author: String,
    content: String,
    createDate: {
        type: Date,
        default: Date.now
    }
});

const Comment = model('comment', commentSchema);

module.exports = Comment;