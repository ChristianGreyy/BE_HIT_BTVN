const asynchandle = require('../utils/asyncHandle');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.getUsers = asynchandle(async (req, res, next) => {
    const user = await User.find({});
    res.json({
        user,
    })
})

exports.getUser = asynchandle(async (req, res, next) => {
    const { userId } = req.params;

    const user = await User.findOne({ _id: userId });
    res.json({
        user,
    })
})

exports.postCreateUser = asynchandle(async (req, res, next) => {
    const { username, password, fullname, age } = req.body;
    console.log(req.body)
    const hashedPw = await bcrypt.hash(password, 7);
    const user = new User({
        username: username,
        fullname,
        age,
        password: hashedPw,
    });
    const result = await user.save();
    res.json({
        message: 'created user successfully',
    })
})

exports.getUserHasAgeFrom18To40 = asynchandle(async (req, res, next) => {
    const user = await User.find({
        $and: [
            {
                age: {
                    $gte: 18
                }
            },
            {
                age: {
                    $lte: 40
                }
            },
        ]

    })
    console.log(user)
    res.json({
        user
    })
})

exports.getUserFullname = asynchandle(async (req, res, next) => {
    const user = await User.find({ fullname: /[h][\w]+/ })
    console.log(user)
    res.json({
        user
    })
})

exports.putEditUser = asynchandle(async (req, res, next) => {

    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(userId, req.body);
    res.json({
        message: 'Update user successfully'
    })
})

exports.deleteUser = asynchandle(async (req, res, next) => {
    const { userId } = req.params;

    const user = await User.findByIdAndRemove(userId, req.body);
    res.json({
        message: 'Delete user successfully'
    })
})