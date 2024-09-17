var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler');
var { query, checkSchema } = require('express-validator');
var { ResourceGetAll, ResourceAdd, ResourceUpdate, ResourceDelete } = require('../controllers/resources/resourcesController');
var createResourceValidationSchema = require('./validationSchemas/resourceCreate');
var updateResourceValidationSchema = require('./validationSchemas/resourceUpdate');


router.get('/all',
    asyncHandler(ResourceGetAll)
);

router.post('/add',
    checkSchema(createResourceValidationSchema),
    asyncHandler(ResourceAdd)
);

router.delete('/delete',
    query('id').notEmpty().isNumeric(),
    asyncHandler(ResourceDelete)
);

router.patch('/update',
    checkSchema(updateResourceValidationSchema),
    query('id').notEmpty().isNumeric(),
    asyncHandler(ResourceUpdate)
);


module.exports = router;