var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler')
var { query, checkSchema } = require('express-validator');
var createUserValidationSchema = require('./validationSchemas/userCreate');
var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();
const { UserRegister, UserDeactivate, UserActivate } = require('../controllers/users/userController');

/* GET users listing. */
router.get('/all', async function (req, res, next) {
  const allUsers = await prisma.systemusers.find;
  res.send(allUsers);
});

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
