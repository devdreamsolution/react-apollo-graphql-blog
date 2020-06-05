const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    name: String,
    slug: String,
    description: String,
    createDate: {
        type: Date,
        default: Date.now
    }
});

const Category = model('category', categorySchema);

module.exports = Category;