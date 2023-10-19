const express = require('express');

const router = express.Router();
const { body } = require('express-validator');
const { ScheduleController } = require('../controllers');
/* const { authMW, adminCheck } = require('../middleware/authentication.middleware'); */

router.get('/', ScheduleController.getSchedules);
router.get('/:ScheduleId', ScheduleController.getScheduleById);

router.post(
  '/',
  body('active').isBoolean(),
  body('where').isString(),
  body('course').isString(),
  body('day').isString(),
  body('schedule').isString(),
  body('course').isString(),
  /* authMW, adminCheck, */
  ScheduleController.createSchedule,
);

router.put(
  '/:ScheduleId',
  body('active').isBoolean(),
  body('where').isString(),
  body('day').isString(),
  body('schedule').isString(),
  /* authMW, adminCheck, */
  ScheduleController.updateSchedule,
);

router.delete('/:ScheduleId', /* authMW, adminCheck, */ ScheduleController.deleteSchedule);

module.exports = router;
