const departmentsService = require('../../services/departmentsService');
const { matchedData, validationResult } = require('express-validator');

exports.GetAllDepartments = async function (req, res, next) {
    const allDepartments = await departmentsService.DepartmentGetAll();

    return res.status(200).send(allDepartments);
}

exports.AddDepartment = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const body = matchedData(req, { includeOptionals: true, locations: ['body'] });

    const newDepartment = await departmentsService.DepartmentAdd(body)
    return res.status(200).send(newDepartment);
}

exports.DeleteDepartment = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const query = matchedData(req, { locations: ['query'] });

    const deletedDepartment = await departmentsService.DepartmentDelete(query.id);
    return res.status(200).send({
        msg: `${deletedDepartment.name} has been deleted`
    });
}

exports.UpdateDepartment = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const query = matchedData(req, { locations: ['query'] });
    const body = matchedData(req, { locations: ['body'] });

    const updatedDepartment = await departmentsService.DepartmentUpdate(query.id, body);

    return res.status(200).send(updatedDepartment);
}