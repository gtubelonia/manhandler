const { matchedData, validationResult } = require('express-validator');
const rolesModel = require('../model/role')

exports.RoleGetAll = async function () {
    const allRoles = await rolesModel.GetAllRoles()

    return allRoles;
};

exports.RoleAdd = async function (body) {
    let role = await rolesModel.FindRoleByName(body.name);

    if (role) throw { status: 400, message: "This Role Already Exists" };

    const newRole = await rolesModel.CreateRole(body);

    return newRole;
}

exports.RoleDelete = async function (id) {
    let roleId = parseInt(id);

    let role = await rolesModel.FindRoleById(roleId);

    if (!role)
        throw { status: 400, message: "This Role Does Not Exist" };

    let deleteRole = rolesModel.DeleteRole(roleId);

    return deleteRole
}

exports.RoleUpdate = async function (id, body) {
    let roleId = parseInt(id);

    let role = await rolesModel.FindRoleById(roleId);

    if (!role)
            throw { status: 400, message: "This Role Does Not Exist" };

    let updatedRole = await rolesModel.UpdateRole(roleId, body);

    return updatedRole;
}
