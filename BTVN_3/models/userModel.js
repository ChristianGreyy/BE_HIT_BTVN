const mongoose = require('mongoose');
const crypto = require('crypto');
const Crypto = require('crypto-js');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
    },
    age: {
        type: Number,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        }
    ],
    role: {
        type: String,
    },
    reset_password_token: {
        type: String,
    },
    reset_password_expire: {
        type: Date,
    }
})

userSchema.methods.getResetPasswordToken = function () {
    const random = crypto.randomBytes(16).toString('hex');
    const resetToken = crypto
        .createHash('sha256', process.env.SECRET_CRYPTO_KEY)
        .update(random)
        .digest('hex')

    this.reset_password_token = resetToken;
    this.reset_password_expire = Date.now() + process.env.EXPIRE_CRYPTO_KEY * 1000 * 60;
    this.save();
    // console.log(new Date())
    return resetToken;

}

module.exports = mongoose.model('User', userSchema);