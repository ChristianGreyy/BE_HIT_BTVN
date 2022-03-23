const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorMiddleware');
require('dotenv').config({ path: './config.env' })
const app = express();

app.use(express.json());
app.use(express.urlencoded())

app.use(express.static(path.join(__dirname, 'public')));

// console.log(path.join(__dirname, 'public'))

app.set('view engine', 'ejs');
app.set('views', 'views');

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