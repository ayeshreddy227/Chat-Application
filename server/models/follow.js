const mongoose = require('mongoose');

const FollowSchema = mongoose.Schema({
    user_id: {type: String},
    following_user_id: {type: String},
},{
	timestamps: true
});

const Follow = module.exports = mongoose.model('Follow', FollowSchema);