const express = require('express');
const router = express.Router();

const Contact = require('../models/contacts');
const User = require('../models/user');

router.get('/contacts', (req, res, next)=>{
    Contact.find(function(err, contacts){
        res.json(contacts);
    })
});

router.post('/contact',(req, res, next)=>{
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

router.post('/user',(req, res, next)=>{
    var body = req.body;
    let newUser = new User()
    newUser.name = body.name;
    newUser.username = body.username;
    newUser.password = body.password;
    newUser.save((err, user)=>{
        if(err){res.json({msg: "Failed",err:err});}
        else{
            res.json(user)
        }
    })
});

router.post('/user/login',(req, res, next)=>{
    var body = req.body;
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