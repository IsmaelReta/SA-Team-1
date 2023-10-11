const {
  createCourse,
  getCourseById,
  getCourses,
  updateCourse,
  deleteCourse,
} = require('./courseController');
const {
  createCategory,
  getCategoryById,
  getCategories,
  updateCategory,
  deleteCategory,
} = require('./categoryController');
const {
  createSchedule,
  getScheduleById,
  getSchedules,
  updateSchedule,
  deleteSchedule,
} = require('./scheduleController');
const {
  createUser,
  getUserById,
  getUserByEmail,
  getUsers,
  updateUser,
  deleteUser,
  updatePassword,
  inscription,
  removeCourseRegistration,
  validateCode,
  createCode,
} = require('./userController');

const {
  createAboutUS,
  updateAboutUS,
  deleteAboutUS,
  getAboutUSById,
  getAboutUSs,
} = require('./aboutUSController');

const {
  getRegisterById,
} = require('./registerController');

const CourseController = {
  createCourse,
  getCourseById,
  getCourses,
  updateCourse,
  deleteCourse,
};

const CategoryController = {
  createCategory,
  getCategoryById,
  getCategories,
  updateCategory,
  deleteCategory,
};
const ScheduleController = {
  createSchedule,
  getScheduleById,
  getSchedules,
  updateSchedule,
  deleteSchedule,
};
const UserController = {
  createUser,
  getUserById,
  getUserByEmail,
  getUsers,
  updateUser,
  deleteUser,
  updatePassword,
  inscription,
  removeCourseRegistration,
  validateCode,
  createCode,
};
const AboutUSController = {
  createAboutUS,
  updateAboutUS,
  deleteAboutUS,
  getAboutUSById,
  getAboutUSs,
};
const RegisterController = {
  getRegisterById,
};

module.exports = {
  CategoryController,
  CourseController,
  ScheduleController,
  UserController,
  AboutUSController,
  RegisterController,
};
