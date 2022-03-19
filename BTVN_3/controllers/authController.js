const asynchandle = require('../utils/asyncHandle');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

exports.login = asynchandle(async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
        const error = new Error('Username not found', 404);
        throw error;
    }
    const isHashed = await bcrypt.compare(password, user.password);
    if (!isHashed) {
        const error = new Error('Invalid username or password');
        throw error;
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