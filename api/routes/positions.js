var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler');
var { query, checkSchema } = require('express-validator');
var positionController = require('../controllers/positions/positions.controller');
var createPositionValidationSchema = require('./validationSchemas/positionCreate');
var updatePositionValidationSchema = require('./validationSchemas/positionUpdate');

router.get('/all',
    asyncHandler(positionController.GetAllPositions)
)

router.post('/add',
    checkSchema(createPositionValidationSchema),
    asyncHandler(positionController.AddPosition)
)

router.patch('/update',
    query('id').notEmpty().isNumeric(),
    checkSchema(updatePositionValidationSchema),
    asyncHandler(positionController.UpdatePosition)
)

router.delete('/delete',
    query('id').notEmpty().isNumeric(),
    asyncHandler(positionController.DeletePosition)
)

module.exports = router;
