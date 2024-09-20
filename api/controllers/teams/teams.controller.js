const teamsService = require('../../services/teamsService');
const { matchedData, validationResult } = require('express-validator');

exports.GetAllTeams = async function (req, res, next) {
    let allTeams = await teamsService.TeamGetAll();

    return res.status(200).json(allTeams);
}

exports.AddTeam = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const body = matchedData(req, { includeOptionals: true, location: 'body' });

    let newTeam = await teamsService.TeamAdd(body);

    return res.status(200).json(newTeam);
}

exports.DeleteTeam = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);

    let deleteTeam = await teamsService.TeamDelete(data.id);

    res.status(200).json({
        msg: `${deleteTeam.name} has been deleted`
    });
}

exports.UpdateTeam = async function(req,res,next){
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);
    const body = matchedData(req, { locations: ['body'] });

    let updateTeam = await teamsService.TeamUpdate(data.id, body);
    return res.status(200).json(updateTeam);
}