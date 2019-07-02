const express = require('express');
const router = express.Router();

const Groups = require('../models/groups');
const Room = require('../models/room');
const Chat = require('../models/chat');
const User = require('../models/user');


router.get('/groups', (req, res, next)=>{
    Groups.find(function(err, groups){
        res.json(groups);
    })
});

router.post('/groups',(req, res, next)=>{
    var body = req.body;
    let newGroups = new Groups()
    newGroups.name = body.name;
    newGroups.description = body.description;
    newGroups.save((err, groups)=>{
        if(err){res.json({msg: "Failed"});}
        else{res.json({msg:"Success"});}
    })
    
});

router.put('/contact/:id',(req, res, next)=>{
    var body = req.body;
    let newContact = new Contact()
    newContact.first_name = body.first_name;
    newContact.last_name = body.last_name;
    newContact.phone = body.phone;
    newContact.save((err, contact)=>{
        if(err){res.json({msg: "Failed"});}
        else{res.json({msg:"Success"});}
    })
});
router.delete('/contact/:id', (req, res, next)=>{
    Contact.remove({_id:req.params.id}, function(err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    })
});

router.post('/msg',(req, res, next)=>{
    var body = req.body;
    let newChat = new Chat()
    newChat.room_id = body.room_id;
    newChat.msg = body.msg;
    newChat.save((err, user)=>{
        if(err){res.json({msg: "Failed",err:err});}
        else{
            res.json(user)
        }
    })
});

router.post('/user/login',(req, res, next)=>{
    var body = req.body;
    let newUser = new User()
    User.find({username: body.username,password:body.password},function(err, user){
        console.log(user)
        if(user){
            res.json(user[0]);
        }
        else{
            res.json({"msg":"invalid credentials", "code":1})
        }
        
    })
});

module.exports = router;