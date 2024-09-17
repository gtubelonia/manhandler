var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler');
var { query, checkSchema } = require('express-validator');
var createEmployeeValidationSchema = require('./validationSchemas/employeeCreate');
var updateEmployeeValidationSchema = require('./validationSchemas/employeeUpdate');
var { EmployeesGetAll, EmployeesAdd, EmployeesDeactivate, EmployeesUpdate } = require('../controllers/employees/employeesController');

router.get('/all',
    asyncHandler(EmployeesGetAll)
)

router.post('/add',
    checkSchema(createEmployeeValidationSchema),
    asyncHandler(EmployeesAdd)
)

router.patch('/deactivate',
    query('id').notEmpty().isNumeric(),
    asyncHandler(EmployeesDeactivate)
)

router.patch('/update',
    query('id').notEmpty().isNumeric(),
    checkSchema(updateEmployeeValidationSchema),
    asyncHandler(EmployeesUpdate)
)

module.exports = router;