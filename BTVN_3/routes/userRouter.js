const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

router.get('/fullname', auth, userController.getUserFullname);
router.get('/age', auth, userController.getUserHasAgeFrom18To40);

router.put('/:userId', userController.putEditUser);
router.get('/:userId', userController.getUser);
router.delete('/:userId', auth, userController.deleteUser);

router.get('/', userController.getUsers);
router.post('/', userController.postCreateUser);
// router.get('/',);
// router.get('/',);

module.exports = router;