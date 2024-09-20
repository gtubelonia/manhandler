var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler');
var { query, checkSchema } = require('express-validator');
var departmentsService = require('../services/departmentsService');
var createDepartmentValidationSchema = require('./validationSchemas/departmentCreate');
var updateDepartmentValidationSchema = require('./validationSchemas/departmentUpdate');

router.get('/all',
    asyncHandler(departmentsService.DepartmentGetAll)
)

router.post('/add',
    checkSchema(createDepartmentValidationSchema),
    asyncHandler(departmentsService.DepartmentAdd)
)

router.patch('/update',
    query('id').notEmpty().isNumeric(),
    checkSchema(updateDepartmentValidationSchema),
    asyncHandler(departmentsService.DepartmentUpdate)
)

router.delete('/delete',
    query('id').notEmpty().isNumeric(),
    asyncHandler(departmentsService.DepartmentDelete)
)

module.exports = router;