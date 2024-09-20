var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler')
var { query, checkSchema } = require('express-validator');
var createUserValidationSchema = require('./validationSchemas/userCreate');
const usersController = require('../controllers/users/users.controller');

router.get('/all',
  asyncHandler(usersController.GetAllUsers)
);

router.post('/register',
  checkSchema(createUserValidationSchema),
  asyncHandler(usersController.RegisterUser)
);

router.patch('/deactivate',
  query('id').notEmpty().isNumeric(),
  asyncHandler(usersController.DeactivateUser)
);

router.patch('/activate',
  query('id').notEmpty().isNumeric(),
  asyncHandler(usersController.ActivateUser)
);

module.exports = router;
