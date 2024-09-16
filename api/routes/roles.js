var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler');
var { query, checkSchema } = require('express-validator');
var createRoleValidationSchema = require('./validationSchemas/roleCreate');
var updateRoleValidationSchema = require('./validationSchemas/roleUpdate');
const { RoleGetAll, RoleAdd, RoleDelete, RoleUpdate } = require('../controllers/roles/rolesController');

var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

router.get('/all',
    asyncHandler(RoleGetAll)
)

router.post('/add',
    checkSchema(createRoleValidationSchema),
    asyncHandler(RoleAdd)
)

router.delete('/delete',
    query('id').notEmpty().isNumeric(),
    asyncHandler(RoleDelete)
)

router.patch('/update',
    query('id').notEmpty().isNumeric(),
    checkSchema(updateRoleValidationSchema),
    asyncHandler(RoleUpdate)
)

module.exports = router;
