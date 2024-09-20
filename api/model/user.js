var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.GetUserByEmail = async function (email) {
    let user = await prisma.systemusers.findFirst({
        where: { email: email },
    });
    return user;
};

exports.CreateNewUser = async function (data, hashword) {
    let newUser = await prisma.systemusers.create({
        data: {
            username: data.username,
            email: data.email,
            password: hashword,
            active: true,
            createdate: new Date(),
        }
    });

    return newUser;
}

exports.GetUserById = async function (userId) {
    let user = await prisma.systemusers.findFirst({
        where: { id: userId },
    });

    return user;
}

exports.UpdateUserById = async function (id, data) {
    let updatedUser = await prisma.systemusers.update({
        where: {
            id: id
        },
        data: data
    });
    return updatedUser;
}

exports.GetAllUsers = async function () {
    let users = await prisma.systemusers.findMany();
    return users;
}