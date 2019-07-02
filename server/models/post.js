const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    user_id: {type: String},
    img_url: {type: String},
    text: {type: String},
    likes: {type: Number}
},{
	timestamps: true
});

const Post = module.exports = mongoose.model('Post', PostSchema);