var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();
var { matchedData, validationResult } = require('express-validator');

async function EmployeesGetAll(req, res, next) {
    const employees = await prisma.employees.findMany();

    return res.status(200).send(employees);
}

async function EmployeesAdd(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);

    let employee = await prisma.employees.findFirst({
        where: {
            firstname: data.firstname,
            middlename: data.middlename,
            lastname: data.lastname
        },
    });

    if (employee)
        return res.status(400).send({ msg: "This Employee Already Exists" });

    let newEmployee = await prisma.employees.create({
        data: {
            firstname: data.firstname,
            lastname: data.lastname,
            middlename: data.middlename,
            active: true,
            startdate: new Date(),
            department: data.department,
            payrate: parseFloat(data.payrate)
        }
    });

    return res.status(201).send(newEmployee);
}

async function EmployeesUpdate(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);
    const body = matchedData(req, { locations: ['body'] });


    let employee = await prisma.employees.findFirst({
        where: { employeeid: parseInt(data.id) },
    });

    if (!employee) return res.status(400).send({ msg: "This Employee Does Not Exist" });

    const updatedEmployee = await prisma.employees.update({
        where: {
            employeeid: parseInt(data.id)
        },
        data: body
    })
    return res.status(200).send(updatedEmployee);
}

async function EmployeesDeactivate(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);

    let employee = await prisma.employees.findFirst({
        where: { employeeid: parseInt(data.id) },
    });

    if (!employee)
        return res.status(400).send({ msg: "This Employee Does Not Exist" });

    const deactivateEmployee = await prisma.employees.update({
        where: {
            employeeid: parseInt(data.id)
        },
        data: {
            active: false,
            enddate: new Date()
        }
    })

    return res.status(200).send({
        msg: `${deactivateEmployee.firstname} ${deactivateEmployee.lastname} has been deactivated`
    });
}

module.exports = { EmployeesGetAll, EmployeesAdd, EmployeesDeactivate, EmployeesUpdate }