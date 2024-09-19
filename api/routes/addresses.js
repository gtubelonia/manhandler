var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler');
var { query, checkSchema } = require('express-validator');
var createAddressValidationSchema = require('./validationSchemas/addressCreate');
var updateAddressValidationSchema = require('./validationSchemas/addressUpdate');
const { AddressGetAllByEmployeeId, AddressAddToEmployee, AddressDelete, AddressUpdate } = require('../controllers/address/addressController');

router.get('/all',
    query('employeeid').notEmpty().isNumeric(),
    asyncHandler(AddressGetAllByEmployeeId)
)

router.post('/add',
    query('employeeid').notEmpty().isNumeric(),
    checkSchema(createAddressValidationSchema),
    asyncHandler(AddressAddToEmployee)
)

router.delete('/delete',
    query('addressid').notEmpty().isNumeric(),
    asyncHandler(AddressDelete)
)

router.patch('/update',
    query('addressid').notEmpty().isNumeric(),
    checkSchema(updateAddressValidationSchema),
    asyncHandler(AddressUpdate)
)

module.exports = router;
