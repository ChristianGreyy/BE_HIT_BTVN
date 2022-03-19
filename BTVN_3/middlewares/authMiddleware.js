const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return next(new Error('Invalid authorization header', 403));
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return next(new Error('Invalid authorization', 403))
    }
    let decode;
    var cert = fs.readFileSync(path.join(__dirname, '../domain.csr'));  // get public key
    jwt.verify(token, cert, { algorithms: ['RS256'] }, async (err, data) => {
        if (err) {
            return next(new Error('Invalid authorization', 403))
        }
        decode = data;
        const { userId } = decode;
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return next(new Error('Invalid authorization', 403))
        }
        if (user.role === 'user') {
            return next(new Error('Invalid authorization', 403))
        }

        return next();
    });

}