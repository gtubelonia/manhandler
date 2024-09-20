const rolesService = require('../../services/rolesService');
const { matchedData, validationResult } = require('express-validator');

exports.GetAllRoles = async function (req, res, next) {
    let allRoles = await rolesService.RoleGetAll();

    return res.status(200).json(allRoles);
}

exports.AddRole = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    let body = matchedData(req, { includeOptionals: true, location: 'body' });

    let newRole = await rolesService.RoleAdd(body);

    return res.status(200).json(newRole);
}

exports.DeleteRole = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);

    let deleteRole = await rolesService.RoleDelete(data.id);

    res.status(200).json({
        msg: `${deleteRole.name} has been deleted`
    });
}

exports.UpdateRole = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const query = matchedData(req, { locations: ['query'] });
    const body = matchedData(req, { locations: ['body'] });

    let updateRole = await rolesService.RoleUpdate(query.id, body);

    return res.status(200).json(updateRole);
}