const coursesRouter = require('./coursesRouter');

const router = (app) => {
    app.use('/courses', coursesRouter);
}

module.exports = router;