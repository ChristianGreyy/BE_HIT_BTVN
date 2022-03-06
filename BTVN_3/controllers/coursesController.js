const Courses = require('../models/coursesModel');

exports.getCourses = async (req, res, next) => {
    try {
        const courses = await Courses.find({});
        res.json({
            courses,
        })
    } catch(err) {
        res.status(500).json({
            message: 'server error',
        })
    }
}

exports.getCourse = async (req, res, next) => {
    try {
        const { idCourse } = req.params;
        const course = await Courses.findOne({_id: idCourse});
        if(!course) {
            return res.status(404).json({
                message: 'Course not found'
            })
        }
        res.json({
            course,
        })
    } catch(err) {
        res.status(500).json({
            message: 'server error',
        })
    }
}

exports.postCourse = async (req, res, next) => {
    try {
        const course = new Courses(req.body);
        const result = await course.save();
        res.json({
            messsage: 'Create course successfully',
        })
    } catch(err) {
        res.status(500).json({
            message: 'server error',
        })
    }
}

exports.putCourse = async (req, res, next) => {
    try {
        const { title, description, imageUrl, leader} = req.body;
        const { idCourse } = req.params;
        const course = await Courses.findOne({_id: idCourse});
        if(!course) {
            return res.status(404).json({
                message: 'Course not found'
            })
        }
        course.title = title;
        course.description = description;
        course.imageUrl = imageUrl;
        course.leader = leader;
        const result = await course.save();
        res.json({
            message: "Edit course successfully"
        })
    } catch(err) {
        res.status(500).json({
            message: 'server error',
        })
    }
}

exports.deleteCourse = async (req, res, next) => {
    try {
        const { idCourse } = req.params;
        const course = await Courses.findOne({_id: idCourse});
        if(!course) {
            return res.status(404).json({
                message: 'Course not found'
            })
        }
        const result = await Courses.deleteOne({_id: idCourse});
        res.json({
            message: "Delete course successfully"
        })
    } catch(err) {
        res.status(500).json({
            message: 'server error',
        })
    }
}