const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    room_id:{type:mongoose.Types.ObjectId, required:true},
    user_id: {type: String,default:""},
    user_name:{type: String,default:""},
    msg: {type: String,default:""}
},{
	timestamps: true
});

const Chat = module.exports = mongoose.model('Chat', ChatSchema);