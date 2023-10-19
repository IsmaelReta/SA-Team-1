const express = require('express');

const router = express.Router();
const { body } = require('express-validator');
const { CategoryController } = require('../controllers');
/* const { authMW, adminCheck } = require('../middleware/authentication.middleware'); */

router.get('/', CategoryController.getCategories);
router.get('/:CategoryId', CategoryController.getCategoryById);
router.get('/courses/:CategoryName', CategoryController.getCategoriesCourse);
router.post('/', body('name').isString(), /* authMW, adminCheck, */ CategoryController.createCategory);

router.put(
  '/:CategoryId',
  body('name').isString(),
  /* authMW, adminCheck, */
  CategoryController.updateCategory,
);

router.delete('/:CategoryId', /* authMW, adminCheck, */ CategoryController.deleteCategory);

module.exports = router;
