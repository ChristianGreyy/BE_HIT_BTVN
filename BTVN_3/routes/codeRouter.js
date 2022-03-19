const express = require('express');
const codeController = require('../controllers/codeController')
const router = express.Router();

const auth = require('../middlewares/authMiddleware');

router.post('/encode', auth, codeController.encode);
router.post('/decode', auth, codeController.decode);

module.exports = router;