var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();
var { matchedData, validationResult } = require('express-validator');

async function ResourceGetAll(req, res, next) {
    const allResources = await prisma.systemresources.findMany();

    return res.status(200).send(allResources);
}

async function ResourceAdd(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);

    let role = await prisma.systemresources.findFirst({
        where: { name: data.name },
    });

    if (role) return res.status(400).send({ msg: "This Resource Already Exists" });

    const newResource = await prisma.systemresources.create({
        data: {
            name: data.name,
            description: data.description
        }
    })
    //TODO: maybe add permissions too?
    return res.status(200).send(newResource);
}

async function ResourceUpdate(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);

    let role = await prisma.systemresources.findFirst({
        where: { id: parseInt(data.id) },
    });

    if (!role) return res.status(400).send({ msg: "This Resource Does Not Exist" });

    let columns = {};
    if (data.name)
        columns.name = data.name
    if (data.description)
        columns.description = data.description

    const updatedResource = await prisma.systemresources.update({
        where: {
            id: parseInt(data.id)
        },
        data: columns
    })
    //TODO: maybe add permissions too?
    return res.status(200).send(updatedResource);
}

async function ResourceDelete(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);

    let resource = await prisma.systemresources.findFirst({
        where: { id: parseInt(data.id) },
    });

    if (!resource)
        return res.status(400).send({ msg: "This Resource Does Not Exist" });

    let deleteResource = await prisma.systemresources.delete({
        where: {
            id: parseInt(data.id)
        }
    })

    //TODO do more? find some way to remove related permissions/resources
    return res.status(200).send({
        msg: `${deleteResource.name} has been deleted`
    });
}


module.exports = {
    ResourceGetAll,
    ResourceAdd,
    ResourceUpdate,
    ResourceDelete
}