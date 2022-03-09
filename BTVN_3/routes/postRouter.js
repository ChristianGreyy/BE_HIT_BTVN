const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, postController.getPosts);
router.get('/:userId', postController.getPost);
router.post('/:userId', postController.postCreatePost);
// router.post('/', postController.postCreateUser);
// router.get('/',);
// router.get('/',);

module.exports = router;