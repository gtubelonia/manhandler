const { matchedData, validationResult } = require('express-validator');
const teamsModel = require('../model/team')

exports.TeamGetAll = async function () {
    const allTeams = await teamsModel.GetAllTeams();
    
    return allTeams;
};

exports.TeamAdd = async function (body) {
    let team = await teamsModel.GetTeamByName(body.name);

    if (team) throw { status: 404, message: "This Team Already Exists" };

    let newTeam = await teamsModel.CreateTeam(body);
    return newTeam;
}

exports.TeamDelete = async function (id) {
    let teamId = parseInt(id);

    let team = await teamsModel.GetTeamById(teamId);

    if (!team) throw { status: 404, message: "This team Does Not Exist" };

    let deleteTeam = await teamsModel.DeleteTeamById(teamId);

    return deleteTeam;
}

exports.TeamUpdate = async function (id, body) {
    let teamId = parseInt(id)
    let team = await teamsModel.GetTeamById(teamId)
    if (!team) throw { status: 404, message: "This team Does Not Exist" };

    const updatedTeam = teamsModel.UpdateTeamById(teamId, body);

    return updatedTeam;
}