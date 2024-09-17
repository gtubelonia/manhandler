var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler');
var { query, checkSchema, check } = require('express-validator');
var { PositionGetAll, PositionAdd, PositionUpdate, PositionDelete } = require('../controllers/positions/positionsController');
var createPositionValidationSchema = require('./validationSchemas/positionCreate');
var updatePositionValidationSchema = require('./validationSchemas/positionUpdate');
const positionUpdate = require('./validationSchemas/positionUpdate');

router.get('/all',
    asyncHandler(PositionGetAll)
)

router.post('/add',
    checkSchema(createPositionValidationSchema),
    asyncHandler(PositionAdd)
)

router.patch('/update',
    query('id').notEmpty().isNumeric(),
    checkSchema(updatePositionValidationSchema),
    asyncHandler(PositionUpdate)
)

router.delete('/delete',
    query('id').notEmpty().isNumeric(),
    asyncHandler(PositionDelete)
)

module.exports = router;
