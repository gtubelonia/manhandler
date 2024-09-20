const employeesService = require('../../services/employeesService');
const { matchedData, validationResult } = require('express-validator');

exports.GetAllEmployees = async function (req, res, next) {
    const employees = await employeesService.EmployeesGetAll();

    return res.status(200).send(employees);
}

exports.AddNewEmployee = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const body = matchedData(req, { locations: 'body' });

    const newEmployee = await employeesService.EmployeesAdd(body);

    return res.status(201).send(newEmployee);

}

exports.UpdateEmployee = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const query = matchedData(req, { locations: ['query'] });
    const body = matchedData(req, { locations: ['body'] });

    const updatedEmployee = await employeesService.EmployeesUpdate(query.id, body);

    return res.status(200).send(updatedEmployee);
}

exports.DeactivateEmployee = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const query = matchedData(req, { locations: ['query'] });

    const deactivateEmployee = await employeesService.EmployeesDeactivate(query.id);
    return res.status(200).send({
        msg: `${deactivateEmployee.firstname} ${deactivateEmployee.lastname} has been deactivated`
    });
}