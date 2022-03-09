const asynchandle = require('../utils/asyncHandle');
const User = require('../models/userModel');
const Post = require('../models/postModel');
const bcrypt = require('bcryptjs');

exports.postCreatePost = asynchandle(async (req, res, next) => {
    const { userId } = req.params;
    const { title, imageUrl, description } = req.body;
    const post = new Post({
        title, imageUrl, description, userId
    });
    const result = await post.save();
    const user = await User.findById(userId);
    // posts/62282ffb7ec8faa130d3c15a
    user.posts.push(result._id);
    const resultUser = await user.save();
    res.json({
        messsage: "Create posst successfully",
    })
})

exports.getPost = asynchandle(async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('posts');
    console.log(user)
    res.json({
        posts: (user.posts),
    })
})

exports.getPosts = asynchandle(async (req, res, next) => {
    const posts = await Post.find({});
    res.json({
        posts,
    })
})

