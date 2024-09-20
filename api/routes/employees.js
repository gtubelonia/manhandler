var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler');
var { query, checkSchema } = require('express-validator');
var createEmployeeValidationSchema = require('./validationSchemas/employeeCreate');
var updateEmployeeValidationSchema = require('./validationSchemas/employeeUpdate');
var employeesService = require('../services/employeesService');

router.get('/all',
    asyncHandler(employeesService.EmployeesGetAll)
)

router.post('/add',
    checkSchema(createEmployeeValidationSchema),
    asyncHandler(employeesService.EmployeesAdd)
)

router.patch('/deactivate',
    query('id').notEmpty().isNumeric(),
    asyncHandler(employeesService.EmployeesDeactivate)
)

router.patch('/update',
    query('id').notEmpty().isNumeric(),
    checkSchema(updateEmployeeValidationSchema),
    asyncHandler(employeesService.EmployeesUpdate)
)

module.exports = router;