const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { query, checkSchema } = require('express-validator');
const teamsController = require('../controllers/teams/teams.controller');
const createTeamValidationSchema = require('./validationSchemas/teamCreate');
const updateTeamValidationSchema = require('./validationSchemas/teamUpdate');

router.get('/all',
    asyncHandler(teamsController.GetAllTeams)
)

router.post('/add',
    checkSchema(createTeamValidationSchema),
    asyncHandler(teamsController.AddTeam)
)

router.patch('/update',
    query('id').notEmpty().isNumeric(),
    checkSchema(updateTeamValidationSchema),
    asyncHandler(teamsController.UpdateTeam)
)

router.delete('/delete',
    query('id').notEmpty().isNumeric(),
    asyncHandler(teamsController.DeleteTeam)
)

module.exports = router;