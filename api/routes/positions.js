var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler');
var { query, checkSchema } = require('express-validator');
var positionService = require('../services/positionsService');
var createPositionValidationSchema = require('./validationSchemas/positionCreate');
var updatePositionValidationSchema = require('./validationSchemas/positionUpdate');

router.get('/all',
    asyncHandler(positionService.PositionGetAll)
)

router.post('/add',
    checkSchema(createPositionValidationSchema),
    asyncHandler(positionService.PositionAdd)
)

router.patch('/update',
    query('id').notEmpty().isNumeric(),
    checkSchema(updatePositionValidationSchema),
    asyncHandler(positionService.PositionUpdate)
)

router.delete('/delete',
    query('id').notEmpty().isNumeric(),
    asyncHandler(positionService.PositionDelete)
)

module.exports = router;
