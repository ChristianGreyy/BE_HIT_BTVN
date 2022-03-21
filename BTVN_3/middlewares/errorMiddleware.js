const errorHanler = require('../utils/errorHandle');

module.exports = (error, req, res, next) => {
    res.json({
        status: error.statusCode,
        message: error.message,
    })
}