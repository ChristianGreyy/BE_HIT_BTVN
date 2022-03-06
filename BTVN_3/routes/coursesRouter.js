const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');

router.get('/', coursesController.getCourses);
router.post('/', coursesController.postCourse);
router.get('/:idCourse', coursesController.getCourse);
router.put('/:idCourse', coursesController.putCourse);
router.delete('/:idCourse', coursesController.deleteCourse);


module.exports = router;