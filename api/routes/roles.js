var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler')
var { query, checkSchema } = require('express-validator');
var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

router.get('/all',
    
)

module.exports = router;
