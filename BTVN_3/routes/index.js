const coursesRouter = require('./coursesRouter');
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const codeRouter = require('./codeRouter');
const authRouter = require('./authRouter');

const router = (app) => {
    app.use('/auth', authRouter);
    app.use('/code', codeRouter);
    app.use('/courses', coursesRouter);
    app.use('/posts', postRouter);
    app.use('/users', userRouter);
}

module.exports = router;