var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.GetAllTeams = async function () {
    let allTeams = await prisma.teams.findMany();
    return allTeams;
}

exports.GetTeamByName = async function (name) {
    let team = await prisma.teams.findFirst({
        where: {
            name: name
        }
    });
    return team;
}

exports.CreateTeam = async function (data) {
    let team = await prisma.teams.create({
        data: {
            name: data.name,
            isactive: data.isactive,
            activationdate: new Date(),
            lead: data.lead
        }
    });
    return team;
}

exports.GetTeamById = async function (id) {
    let team = await prisma.teams.findFirst({
        where: { id: id },
    });
    return team;
}

exports.DeleteTeamById = async function (id) {
    let team = await prisma.teams.delete({
        where: {
            id: parseInt(id)
        }
    });
    return team;
}

exports.UpdateTeamById = async function (id, body) {
    let updateTeam = await prisma.teams.update({
        where: {
            id: parseInt(id)
        },
        data: body
    });
    return updateTeam;
}