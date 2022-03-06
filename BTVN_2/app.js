const express = require('express');
const run = require('./views');

const app = express();

app.use(express.json());

run(app);



app.listen(3000, () => {
    console.log('listening on port 3000')
})