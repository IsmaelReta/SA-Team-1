const express = require('express');

const router = express.Router();
const { body } = require('express-validator');
const { CourseController } = require('../controllers');
/* const { authMW, adminCheck } = require('../middleware/authentication.middleware'); */

router.get('/', CourseController.getCourses);

router.get('/:CourseId', CourseController.getCourseById);

router.post(
  '/',
  body('name').isString(),
  body('description').isString(),
  body('maxStudents').isInt(),
  body('start').isString(),
  body('end').isString(),
  body('active').isBoolean(),
  body('price').isInt(),
  body('requirement').isString(),
  body('teacher').isString(),
  body('CourseCategoryName').isString(),
  /* authMW, adminCheck, */
  CourseController.createCourse,
);

router.put(
  '/:CourseId',
  body('name').isString(),
  body('description').isString(),
  body('maxStudents').isInt(),
  body('start').isString(),
  body('end').isString(),
  body('active').isBoolean(),
  body('price').isInt(),
  body('requirement').isString(),
  body('teacher').isString(),
  body('CourseCategoryName').isString(),
  /* authMW, adminCheck, */
  CourseController.updateCourse,
);

router.delete('/:CourseId', /* authMW, adminCheck, */ CourseController.deleteCourse);

// export
module.exports = router;
