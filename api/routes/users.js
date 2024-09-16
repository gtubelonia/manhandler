var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler')
var { query, checkSchema } = require('express-validator');
var createUserValidationSchema = require('./validationSchemas/userCreate');
var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();
const { UserRegister, UserDeactivate, UserActivate, UserGetAll } = require('../controllers/users/usersController');

router.get('/all',
  asyncHandler(UserGetAll)
);

router.post('/register',
  checkSchema(createUserValidationSchema),
  asyncHandler(UserRegister)
);

router.patch('/deactivate',
  query('id').notEmpty().isNumeric(),
  asyncHandler(UserDeactivate)
);

router.patch('/activate',
  query('id').notEmpty().isNumeric(),
  asyncHandler(UserActivate)
);


module.exports = router;
