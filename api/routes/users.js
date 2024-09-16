var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler')
var { checkSchema } = require('express-validator');
var createUserValidationSchema = require('./validationSchemas/userCreate');
var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();
const { UserRegister } = require('../controllers/users/userController');

/* GET users listing. */
router.get('/all', async function (req, res, next) {
  const allUsers = await prisma.systemusers.find;
  res.send(allUsers);
});

router.post('/register',
  checkSchema(createUserValidationSchema),
  asyncHandler(UserRegister)
);

module.exports = router;
