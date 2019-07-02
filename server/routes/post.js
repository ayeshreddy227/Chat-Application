const express = require('express');
const router = express.Router();

const Post = require('../models/post');
const Comment = require('../models/comment');
const Follow = require('../models/follow');

router.get('/post', (req, res, next)=>{
    Follow.find({user_id:""}, function(err, user){
        var user_ids = []
        for(let i of user){
            user_ids.push(i._id)
        }
        Post.aggregate([
            { $match : { user_id: {$in:user_ids}} },
            {$lookup:{from:"comment",localField:"_id",foreignField:"post_id",as:"comment"}}
          ], function(err, posts) {
            res.json(posts);
          });
    })
    
    // Post.find(function(err, groups){
    //     res.json(groups);
    // })
});

router.post('/post', (req, res, next)=>{
    var body = req.body;
    let newPost = new Post()
    newPost.user_id = body.user_id;
    newPost.img_url = body.img_url;
    newPost.text = body.text;
    newPost.likes = 0;
    newPost.save((err, groups)=>{
        if(err){res.json({msg: "Failed"});}
        else{res.json({msg:"Success"});}
    })
});

router.post('/comment', (req, res, next)=>{
    var body = req.body;
    let newComment = new Comment()
    newComment.user_id = body.user_id;
    newComment.post_id = body.post_id;
    newComment.text = body.text;
    newComment.save((err, groups)=>{
        if(err){res.json({msg: "Failed"});}
        else{res.json({msg:"Success"});}
    })
});
module.exports = router;