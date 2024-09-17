var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();
var { matchedData, validationResult } = require('express-validator');
var { ToUserDto } = require('./dtos/userDto');
var { argonHash, argonVerify } = require('../../utils/hash');

async function UserRegister(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);
    data.password = await argonHash(data.password);

    let user = await prisma.systemusers.findFirst({
        where: { email: data.email },
    });

    if (user)
        return res.status(400).send({ msg: "This User Already Exists" });

    let hashword = await argonHash(data.password);

    let newUser = await prisma.systemusers.create({
        data: {
            username: data.username,
            email: data.email,
            password: hashword,
            active: true,
            createdate: new Date(),
        }
    });

    return res.status(201).send(ToUserDto(newUser));
};

async function UserDeactivate(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);

    let user = await prisma.systemusers.findFirst({
        where: { id: parseInt(data.id) },
    });

    if (!user)
        return res.status(400).send({ msg: "This User Does Not Exist" });

    if (!user.active)
        return res.status(400).send({ msg: "This User Has Already Been Deactivated" });

    let updateUser = await prisma.systemusers.update({
        where: {
            id: parseInt(data.id)
        },
        data: {
            active: false,
            deactivatedate: new Date()
        }
    })
    //TODO do more? find some way to remove related roles?

    return res.status(200).send({
        msg: `${updateUser.username} has been deactivated`
    });
}

async function UserActivate(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);

    let user = await prisma.systemusers.findFirst({
        where: { id: parseInt(data.id) },
    });

    if (!user)
        return res.status(400).send({ msg: "This User Does Not Exist" });
    console.log(user);

    if (user.active)
        return res.status(400).send({ msg: "This User is already active" });

    let updateUser = await prisma.systemusers.update({
        where: {
            id: parseInt(data.id)
        },
        data: {
            active: false,
            deactivatedate: new Date()
        }
    })
    //TODO do more? find some way to remove related roles?

    return res.status(200).send({
        msg: `${updateUser.username} has been activated`
    });
}

async function UserGetAll(req, res, next) {
    const allUsers = await prisma.systemusers.findMany();

    return res.status(200).send(allUsers);
}

module.exports = { UserRegister, UserDeactivate, UserActivate, UserGetAll }