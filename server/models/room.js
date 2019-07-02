const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    group_id: {type: String},
    users:[{type: String}]
},{
	timestamps: true
});

const Room = module.exports = mongoose.model('Room', RoomSchema);