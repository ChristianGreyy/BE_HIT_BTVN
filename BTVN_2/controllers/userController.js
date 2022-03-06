const users = require('../database/user');
const User = require('../model/user');

exports.getUser = (req, res, next) => {
    res.json({
        msg: 'success',
        users,
    })
}
