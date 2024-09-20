var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler');
var { query, checkSchema } = require('express-validator');
var departmentsController = require('../controllers/departments/departments.controller');
var createDepartmentValidationSchema = require('./validationSchemas/departmentCreate');
var updateDepartmentValidationSchema = require('./validationSchemas/departmentUpdate');

router.get('/all',
    asyncHandler(departmentsController.GetAllDepartments)
)

router.post('/add',
    checkSchema(createDepartmentValidationSchema),
    asyncHandler(departmentsController.AddDepartment)
)

router.patch('/update',
    query('id').notEmpty().isNumeric(),
    checkSchema(updateDepartmentValidationSchema),
    asyncHandler(departmentsController.UpdateDepartment)
)

router.delete('/delete',
    query('id').notEmpty().isNumeric(),
    asyncHandler(departmentsController.DeleteDepartment)
)

module.exports = router;