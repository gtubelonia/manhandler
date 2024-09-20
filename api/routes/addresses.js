var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler');
var { query, checkSchema } = require('express-validator');
var createAddressValidationSchema = require('./validationSchemas/addressCreate');
var updateAddressValidationSchema = require('./validationSchemas/addressUpdate');
const addressController = require('../controllers/address/addresses.controller');

router.get('/all',
    query('employeeid').notEmpty().isNumeric(),
    asyncHandler(addressController.GetAddressByEmployeeId)
)

router.post('/add',
    query('employeeid').notEmpty().isNumeric(),
    checkSchema(createAddressValidationSchema),
    asyncHandler(addressController.AddAddressToEmployee)
)

router.delete('/delete',
    query('addressid').notEmpty().isNumeric(),
    asyncHandler(addressController.DeleteAddressFromEmployee)
)

router.patch('/update',
    query('addressid').notEmpty().isNumeric(),
    checkSchema(updateAddressValidationSchema),
    asyncHandler(addressController.UpdateAddressForEmployee)
)

module.exports = router;
