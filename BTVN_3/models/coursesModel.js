const mongoose = require('mongoose');

const { Schema } = mongoose;

const coursesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    leader: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Course', coursesSchema);