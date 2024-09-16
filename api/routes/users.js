var express = require('express');
var router = express.Router();
var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const allUsers = await prisma.persons.findMany();
  res.send(allUsers);
});

router.post('/register',

)

module.exports = router;
