var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler');
var { query, checkSchema } = require('express-validator');
var createAddressValidationSchema = require('./validationSchemas/addressCreate');
var updateAddressValidationSchema = require('./validationSchemas/addressUpdate');
const addressService = require('../services/addressService');

router.get('/all',
    query('employeeid').notEmpty().isNumeric(),
    asyncHandler(addressService.AddressGetAllByEmployeeId)
)

router.post('/add',
    query('employeeid').notEmpty().isNumeric(),
    checkSchema(createAddressValidationSchema),
    asyncHandler(addressService.AddressAddToEmployee)
)

router.delete('/delete',
    query('addressid').notEmpty().isNumeric(),
    asyncHandler(addressService.AddressDelete)
)

router.patch('/update',
    query('addressid').notEmpty().isNumeric(),
    checkSchema(updateAddressValidationSchema),
    asyncHandler(addressService.AddressUpdate)
)

module.exports = router;
