var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.GetAllPositions = async function () {
    let allPositions = await prisma.positions.findMany();

    return allPositions;
}

exports.GetPositionByName = async function (positionName) {
    let position = await prisma.positions.findFirst({
        where: { name: positionName },
    });

    return position
}

exports.GetPositionById = async function (positionId) {
    let position = await prisma.positions.findFirst({
        where: { positionid: positionId },
    });

    return position;
}

exports.CreatePosition = async function (data) {
    let newPosition = await prisma.positions.create({
        data: {
            name: data.name,
            description: data.description,
            basepayrate: data.basepayrate
        }
    });

    return newPosition;
}

exports.DeletePosition = async function (positionId) {
    let deletePosition = await prisma.positions.delete({
        where: {
            positionid: positionId
        }
    });

    return deletePosition;
}

exports.UpdatePosition = async function (positionId, data) {
    let updatePosition = await prisma.positions.update({
        where: {
            positionid: positionId
        },
        data: data
    });

    return updatePosition;
}