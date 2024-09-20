var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.GetAllRoles = async function () {
    let allRoles = await prisma.systemroles.findMany();

    return allRoles;
}

exports.FindRoleByName = async function (name) {
    let role = await prisma.systemroles.findFirst({
        where: { name: name },
    });
    return role;
}

exports.CreateRole = async function (data) {
    let newRole = await prisma.systemroles.create({
        data: {
            name: data.name,
            description: data.description
        }
    });
    return newRole;
}

exports.FindRoleById = async function (roleId) {
    let role = await prisma.systemroles.findFirst({
        where: {
            id: roleId
        },
    });
    return role;
}

exports.DeleteRole = async function (roleId) {
    let deleteRole = await prisma.systemroles.delete({
        where: {
            id: roleId
        }
    });
    return deleteRole;
}

exports.UpdateRole = async function (roleId, body) {
    let updateRole = await prisma.systemroles.update({
        where: {
            id: parseInt(roleId)
        },
        data: body
    });
    return updateRole;
}