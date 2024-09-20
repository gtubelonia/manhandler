var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler');
var { query, checkSchema } = require('express-validator');
var createEmployeeValidationSchema = require('./validationSchemas/employeeCreate');
var updateEmployeeValidationSchema = require('./validationSchemas/employeeUpdate');
var employeesController = require('../controllers/employees/employees.controller');

router.get('/all',
    asyncHandler(employeesController.GetAllEmployees)
)

router.post('/add',
    checkSchema(createEmployeeValidationSchema),
    asyncHandler(employeesController.AddNewEmployee)
)

router.patch('/deactivate',
    query('id').notEmpty().isNumeric(),
    asyncHandler(employeesController.DeactivateEmployee)
)

router.patch('/update',
    query('id').notEmpty().isNumeric(),
    checkSchema(updateEmployeeValidationSchema),
    asyncHandler(employeesController.UpdateEmployee)
)

module.exports = router;