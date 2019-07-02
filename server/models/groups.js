const mongoose = require('mongoose');

const GroupSchema = mongoose.Schema({
    name: {type: String,default:""},
    description:{type: String,default:""}
},{
	timestamps: true
});

const Group = module.exports = mongoose.model('Group', GroupSchema);