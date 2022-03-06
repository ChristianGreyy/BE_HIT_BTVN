const authRouter = require('./userRouter');

const run = ((app) => {
    app.use(authRouter);
})

module.exports = run;