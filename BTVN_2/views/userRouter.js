const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

router.get('/user', userController.getUser);

router.post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    const user = new User(username, password);
    user.save();
    res.json({
        msg: 'Create user successfully'
    });
   
})

router.put('/edit/:idUser', (req, res, next) => {
    const { idUser } = req.params;
    const { username, password } = req.body;
    User.findById(idUser, user => {
        if(!user ) {
            return res.json({
                msg: 'User not found'
            });
        }
        user.username = username;
        user.password = password;

        return res.json({
            msg: 'Update user successfully'
        });
    })
})

router.delete('/delete/:idUser', (req, res, next) => {
    const { idUser } = req.params;
    const { username, password } = req.body;
    User.deleteById(idUser, user => {
        if(!user) {
            return res.json('User not found');
        }
        return res.json({
            msg: 'Delete user successfully'
        });
    })

})

module.exports = router;