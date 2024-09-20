var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler');
var { query, checkSchema } = require('express-validator');
var createRoleValidationSchema = require('./validationSchemas/roleCreate');
var updateRoleValidationSchema = require('./validationSchemas/roleUpdate');
const rolesService = require('../services/rolesService');

router.get('/all',
    asyncHandler(rolesService.RoleGetAll)
)

router.post('/add',
    checkSchema(createRoleValidationSchema),
    asyncHandler(rolesService.RoleAdd)
)

router.delete('/delete',
    query('id').notEmpty().isNumeric(),
    asyncHandler(rolesService.RoleDelete)
)

router.patch('/update',
    query('id').notEmpty().isNumeric(),
    checkSchema(updateRoleValidationSchema),
    asyncHandler(rolesService.RoleUpdate)
)

module.exports = router;