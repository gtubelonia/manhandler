var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();
var { matchedData, validationResult } = require('express-validator');

async function PositionGetAll(req, res, next) {
    const allpositions = await prisma.positions.findMany();

    return res.status(200).send(allpositions);
};

async function PositionAdd(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);

    let position = await prisma.positions.findFirst({
        where: { name: data.name },
    });

    if (position) return res.status(400).send({ msg: "This Position Already Exists" });

    const newposition = await prisma.positions.create({
        data: {
            name: data.name,
            description: data.description,
            basepayrate: data.basepayrate
        }
    })

    return res.status(200).send(newposition);
}

async function PositionDelete(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);

    let position = await prisma.positions.findFirst({
        where: { positionid: parseInt(data.id) },
    });

    if (!position)
        return res.status(400).send({ msg: "This position Does Not Exist" });

    let deletePosition = await prisma.positions.delete({
        where: {
            positionid: parseInt(data.id)
        }
    })

    return res.status(200).send({
        msg: `${deletePosition.name} has been deleted`
    });
}

async function PositionUpdate(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);
    const body = matchedData(req, { locations: ['body'] });

    let position = await prisma.positions.findFirst({
        where: { positionid: parseInt(data.id) },
    });

    if (!position) return res.status(400).send({ msg: "This Does Not Exist" });

    const updatedPosition = await prisma.positions.update({
        where: {
            positionid: parseInt(data.id)
        },
        data: body
    })

    return res.status(200).send(updatedPosition);
}

module.exports = {
    PositionGetAll,
    PositionAdd,
    PositionDelete,
    PositionUpdate,
}