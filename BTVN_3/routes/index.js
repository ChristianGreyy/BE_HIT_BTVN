const coursesRouter = require('./coursesRouter');
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');

const router = (app) => {
    app.use('/courses', coursesRouter);
    app.use('/posts', postRouter);
    app.use('/users', userRouter);
}

module.exports = router;