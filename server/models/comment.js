const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    user_id: {type: String},
    post_id: {type: String},
    text: {type: String}
},{
	timestamps: true
});

const Comment = module.exports = mongoose.model('Comment', CommentSchema);