const asynchandle = require('../utils/asyncHandle');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const errorHandler = require('../utils/errorHandle');
const crypto = require('crypto');

exports.getLogin = (req, res, next) => {
    res.render('login')
}

exports.postLogin = asynchandle(async (req, res, next) => {
    const { username, password } = req.body;
    console.log(username, password)
    const user = await User.findOne({ username: username });
    console.log(user);
    if (!user) {
        return next(new errorHandler('Username not found', 404));
        // const error = new Error('Username not found', 404);
        // throw error;
    }
    const isHashed = await bcrypt.compare(password, user.password);
    if (!isHashed) {
        return next(new errorHandler('Invalid username or password'))
    }

    const privateKey = fs.readFileSync(path.join(__dirname, '../domain.key'));
    const token = jwt.sign({
        username,
        userId: user._id,
    }, privateKey, { algorithm: 'RS256' });


    res.json({
        message: 'login successfully',
        token,
    })

})

exports.getResetPw = (req, res, next) => {
    res.render('forget-password');
}
exports.getResetPwToken = asynchandle(async (req, res, next) => {
    const { id, code } = req.query;
    const user = await User.findOne({
        id: id,
        reset_password_expire: { $gte: Date.now() },
    })
    console.log(user)
    if (!user) {
        return next(new errorHandler('Not found', 404));
    }
    return res.render('change-password', {
        id: user.id,
    })
})

exports.postResetPwToken = asynchandle(async (req, res, next) => {
    const { password } = req.body;
    const { userId } = req.params;
    const user = await User.findOne({
        _id: userId,
    })
    if (!user) {
        return next(new errorHandler('Not found', 404));
    }
    const hashedPw = await bcrypt.hash(password, 7);
    user.password = hashedPw;
    await user.save();
    return res.redirect('/auth/login')
})

exports.postResetPw = asynchandle(async (req, res, next) => {
    const { username } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
        return next(new errorHandler('Not found usrname', 404));
    }

    const token = user.getResetPasswordToken();

    res.redirect(`/auth/reset-password/token/?id=${user._id}&code=${token}`)



});