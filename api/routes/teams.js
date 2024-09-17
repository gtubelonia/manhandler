var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler');
var { query, checkSchema } = require('express-validator');
var { TeamGetAll, TeamAdd, TeamUpdate, TeamDelete } = require('../controllers/teams/teamsController');
var createTeamValidationSchema = require('./validationSchemas/teamCreate');
var updateTeamValidationSchema = require('./validationSchemas/teamUpdate');

router.get('/all',
    asyncHandler(TeamGetAll)
)

router.post('/add',
    checkSchema(createTeamValidationSchema),
    asyncHandler(TeamAdd)
)

router.patch('/update',
    query('id').notEmpty().isNumeric(),
    checkSchema(updateTeamValidationSchema),
    asyncHandler(TeamUpdate)
)

router.delete('/delete',
    query('id').notEmpty().isNumeric(),
    asyncHandler(TeamDelete)
)

module.exports = router;