var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler');
var { query, checkSchema } = require('express-validator');
var { DepartmentGetAll, DepartmentAdd, DepartmentUpdate, DepartmentDelete } = require('../controllers/departments/departmentsController');
var createDepartmentValidationSchema = require('./validationSchemas/departmentCreate');
var updateDepartmentValidationSchema = require('./validationSchemas/departmentUpdate');

router.get('/all',
    asyncHandler(DepartmentGetAll)
)

router.post('/add',
    checkSchema(createDepartmentValidationSchema),
    asyncHandler(DepartmentAdd)
)

router.patch('/update',
    query('id').notEmpty().isNumeric(),
    checkSchema(updateDepartmentValidationSchema),
    asyncHandler(DepartmentUpdate)
)

router.delete('/delete',
    query('id').notEmpty().isNumeric(),
    asyncHandler(DepartmentDelete)
)

module.exports = router;