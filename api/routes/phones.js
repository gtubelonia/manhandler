var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler');
var { query, checkSchema } = require('express-validator');
var createPhoneValidationSchema = require('./validationSchemas/phoneCreate');
var updatePhoneValidationSchema = require('./validationSchemas/phoneUpdate');
const phoneController = require('../controllers/phones/phones.controller');

router.get('/all',
    query('employeeid').notEmpty().isNumeric(),
    asyncHandler(phoneController.GetEmployeePhones)
)

router.post('/add',
    query('employeeid').notEmpty().isNumeric(),
    checkSchema(createPhoneValidationSchema),
    asyncHandler(phoneController.AddPhoneToUser)
)

router.delete('/delete',
    query('id').notEmpty().isNumeric(),
    asyncHandler(phoneController.DeletePhoneFromUser)
)

router.patch('/update',
    query('id').notEmpty().isNumeric(),
    checkSchema(updatePhoneValidationSchema),
    asyncHandler(phoneController.UpdatePhoneForUser)
)

module.exports = router;
