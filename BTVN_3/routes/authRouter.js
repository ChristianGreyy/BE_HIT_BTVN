const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/reset-password', authController.getResetPw);
router.post('/reset-password', authController.postResetPw);
router.get('/reset-password/token', authController.getResetPwToken);
router.post('/reset-password/token/:userId', authController.postResetPwToken);

module.exports = router;