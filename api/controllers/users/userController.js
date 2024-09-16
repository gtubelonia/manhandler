var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();
var { matchedData, validationResult } = require('express-validator');
var { ToUserDto } = require('./Dto/UserDto');
var { argonHash, argonVerify } = require('../../utils/hash');


async function UserRegister(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);
    data.password = await argonHash(data.password);

    let user = await prisma.systemusers.findFirst({
        where: { email: data.email },
    });

    if (user) {
        return res.status(400).send({ msg: "This User Already Exists" });
    }

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

module.exports = { UserRegister }