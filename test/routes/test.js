const express = require('express');

const router = express.Router();

router.get('/:id/:test', (req, res, next) => {
    console.log(req.params)
    res.json({
        msg: 'ok'
    })
})

module.exports = router;