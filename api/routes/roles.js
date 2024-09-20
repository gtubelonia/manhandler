var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler');
var { query, checkSchema } = require('express-validator');
var createRoleValidationSchema = require('./validationSchemas/roleCreate');
var updateRoleValidationSchema = require('./validationSchemas/roleUpdate');
const rolesController = require('../controllers/roles/roles.controller');

router.get('/all',
    asyncHandler(rolesController.GetAllRoles)
)

router.post('/add',
    checkSchema(createRoleValidationSchema),
    asyncHandler(rolesController.AddRole)
)

router.delete('/delete',
    query('id').notEmpty().isNumeric(),
    asyncHandler(rolesController.DeleteRole)
)

router.patch('/update',
    query('id').notEmpty().isNumeric(),
    checkSchema(updateRoleValidationSchema),
    asyncHandler(rolesController.UpdateRole)
)

module.exports = router;