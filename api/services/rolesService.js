var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();
var { matchedData, validationResult } = require('express-validator');

exports.RoleGetAll = async function (req, res, next) {
    const allRoles = await prisma.systemroles.findMany();

    return res.status(200).send(allRoles);
};

exports.RoleAdd = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);

    let role = await prisma.systemroles.findFirst({
        where: { name: data.name },
    });

    if (role) return res.status(400).send({ msg: "This Role Already Exists" });

    const newRole = await prisma.systemroles.create({
        data: {
            name: data.name,
            description: data.description
        }
    })
    //TODO: maybe add resources/permissions too?
    return res.status(200).send(newRole);
}

exports.RoleDelete = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);

    let role = await prisma.systemroles.findFirst({
        where: { id: parseInt(data.id) },
    });

    if (!role)
        return res.status(400).send({ msg: "This Role Does Not Exist" });

    let deleteRole = await prisma.systemroles.delete({
        where: {
            id: parseInt(data.id)
        }
    })

    //TODO do more? find some way to remove related permissions/resources
    return res.status(200).send({
        msg: `${deleteRole.name} has been deleted`
    });
}

exports.RoleUpdate = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);
    const body = matchedData(req, { locations: ['body'] });

    let role = await prisma.systemroles.findFirst({
        where: { name: data.name },
    });

    if (!role) return res.status(400).send({ msg: "This Does Not Exist" });

    const updatedRole = await prisma.systemroles.update({
        where: {
            id: parseInt(data.id)
        },
        data: body
    })
    //TODO: maybe add resources/permissions too?
    return res.status(200).send(updatedRole);
}
