var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler');
var { query, checkSchema } = require('express-validator');
var resourceController = require('../controllers/resources/resources.controller');
var createResourceValidationSchema = require('./validationSchemas/resourceCreate');
var updateResourceValidationSchema = require('./validationSchemas/resourceUpdate');

router.get('/all',
    asyncHandler(resourceController.GetAll)
);

router.post('/add',
    checkSchema(createResourceValidationSchema),
    asyncHandler(resourceController.CreateResource)
);

router.delete('/delete',
    query('id').notEmpty().isNumeric(),
    asyncHandler(resourceController.DeleteResource)
);

router.patch('/update',
    query('id').notEmpty().isNumeric(),
    checkSchema(updateResourceValidationSchema),
    asyncHandler(resourceController.UpdateResource)
);


module.exports = router;