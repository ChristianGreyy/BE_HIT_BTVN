const express = require('express');

const app = express();
const testRouter = require('./routes/test');

app.use('/:home', testRouter);

// app.get('/:test/:mg', (req, res, next) => {
//     console.log(req.params);
//     res.json({
//         msg: 'Ok'
//     })
// })

app.listen(3000, () => {
    console.log('listening on port 3000')
})