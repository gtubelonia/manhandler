const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { query, checkSchema } = require('express-validator');
const teamsService = require('../services/teamsService');
const createTeamValidationSchema = require('./validationSchemas/teamCreate');
const updateTeamValidationSchema = require('./validationSchemas/teamUpdate');

router.get('/all',
    asyncHandler(teamsService.TeamGetAll)
)

router.post('/add',
    checkSchema(createTeamValidationSchema),
    asyncHandler(teamsService.TeamAdd)
)

router.patch('/update',
    query('id').notEmpty().isNumeric(),
    checkSchema(updateTeamValidationSchema),
    asyncHandler(teamsService.TeamUpdate)
)

router.delete('/delete',
    query('id').notEmpty().isNumeric(),
    asyncHandler(teamsService.TeamDelete)
)

module.exports = router;