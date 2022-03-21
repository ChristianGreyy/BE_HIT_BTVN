const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorMiddleware');
require('dotenv').config({ path: './config.env' })
const app = express();

app.use(express.json());

const router = require('./routes/index');

router(app);

app.use(errorHandler);

mongoose.connect('mongodb://localhost/courses')
    .then(result => {
        console.log('Success')
        app.listen(3000, () => {
            console.log('server listening on port 3000');
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'server error',
        })
    })