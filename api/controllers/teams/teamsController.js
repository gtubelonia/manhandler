var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();
var { matchedData, validationResult } = require('express-validator');

async function TeamGetAll(req, res, next) {
    const allteams = await prisma.teams.findMany();

    return res.status(200).send(allteams);
};

async function TeamAdd(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req, { includeOptionals: true });

    let team = await prisma.teams.findFirst({
        where: { name: data.name },
    });

    if (team) return res.status(400).send({ msg: "This Team Already Exists" });

    const newteam = await prisma.teams.create({
        data: {
            name: data.name,
            isactive: data.isactive,
            activationdate: new Date(),
            lead: data.lead
        }
    })

    return res.status(200).send(newteam);
}

async function TeamDelete(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);

    let team = await prisma.teams.findFirst({
        where: { id: parseInt(data.id) },
    });

    if (!team)
        return res.status(400).send({ msg: "This team Does Not Exist" });

    let deleteTeam = await prisma.teams.delete({
        where: {
            id: parseInt(data.id)
        }
    })

    return res.status(200).send({
        msg: `${deleteTeam.name} has been deleted`
    });
}

async function TeamUpdate(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);
    const body = matchedData(req, { locations: ['body'] });

    let team = await prisma.teams.findFirst({
        where: { id: parseInt(data.id) },
    });

    if (!team) return res.status(400).send({ msg: "This Does Not Exist" });

    const updatedTeam = await prisma.teams.update({
        where: {
            id: parseInt(data.id)
        },
        data: body
    })

    return res.status(200).send(updatedTeam);
}

module.exports = {
    TeamGetAll,
    TeamAdd,
    TeamDelete,
    TeamUpdate,
}