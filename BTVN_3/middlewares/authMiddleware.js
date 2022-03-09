const User = require('../models/userModel');


module.exports = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    const userId = authHeader.split(' ')[1];

    const user = await User.findOne({ _id: userId });
    if (!user) {
        return res.status(401).json({
            message: 'Not authorized'
        })
    }
    if (user.role === 'user') {
        return res.status(401).json({
            message: 'Not authorized'
        })
    }

    return next();
}