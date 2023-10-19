const express = require('express');
const { body } = require('express-validator');
const { AboutUSController } = require('../controllers');
/* const { authMW, adminCheck } = require('../middleware/authentication.middleware'); */

const router = express.Router();
router.get('/:aboutUSId', AboutUSController.getAboutUSById);
router.get('/', AboutUSController.getAboutUSs);
router.post(
  '/',
  body('title').isString(),
  body('subtitle').isString(),
  body('image').isString(),
  body('description').isString(),
  body('priority').isInt(),
  body('active').isBoolean(),
  /* authMW, adminCheck, */
  AboutUSController.createAboutUS,
);
router.put(
  '/:aboutUSId',
  body('title').isString(),
  body('subtitle').isString(),
  body('image').isString(),
  body('description').isString(),
  body('priority').isInt(),
  body('active').isBoolean(),
  /* authMW, adminCheck, */
  AboutUSController.updateAboutUS,
);
router.delete('/:aboutUSId', /* authMW, adminCheck, */ AboutUSController.deleteAboutUS);

module.exports = router;
