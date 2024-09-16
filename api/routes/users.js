var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler')
const { checkSchema } = require('express-validator');
var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

/* GET users listing. */
router.get('/all', async function (req, res, next) {
  const allUsers = await prisma.persons.findMany();
  res.send(allUsers);
});

router.post('/register',
  checkSchema(createUserValidationSchema),
  asyncHandler(UserRegister)
);

module.exports = router;
