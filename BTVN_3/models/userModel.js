const mongoose = require('mongoose');

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
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        }
    ],
    role: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('User', userSchema);