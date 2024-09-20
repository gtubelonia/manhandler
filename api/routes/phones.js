var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler');
var { query, checkSchema } = require('express-validator');
var createPhoneValidationSchema = require('./validationSchemas/phoneCreate');
var updatePhoneValidationSchema = require('./validationSchemas/phoneUpdate');
const phoneService= require('../services/phonesService.js');

router.get('/all',
    asyncHandler(phoneService.PhoneGetAllByEmployeeId)
)

router.post('/add',
    query('employeeid').notEmpty().isNumeric(),
    checkSchema(createPhoneValidationSchema),
    asyncHandler(phoneService.PhoneAddToUser)
)

router.delete('/delete',
    query('id').notEmpty().isNumeric(),
    asyncHandler(phoneService.PhoneDelete)
)

router.patch('/update',
    query('id').notEmpty().isNumeric(),
    checkSchema(updatePhoneValidationSchema),
    asyncHandler(phoneService.PhoneUpdate)
)

module.exports = router;
