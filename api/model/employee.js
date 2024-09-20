var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.GetAllEmployees = async function () {
    let allEmployees = await prisma.employees.findMany();
    return allEmployees;
}

exports.GetEmployeeByName = async function (data) {
    let employee = await prisma.employees.findFirst({
        where: {
            firstname: data.firstname,
            middlename: data.middlename,
            lastname: data.lastname
        },
    });

    return employee;
}

exports.GetEmployeeById = async function (id) {
    let employee = await prisma.employees.findFirst({
        where: { employeeid: id },
    });
    return employee;
}

exports.CreateEmployee = async function (data) {
    let newEmployee = await prisma.employees.create({
        data: {
            firstname: data.firstname,
            lastname: data.lastname,
            middlename: data.middlename,
            active: true,
            startdate: new Date(),
            department: data.department,
            payrate: data.payrate
        }
    });

    return newEmployee;
}

exports.UpdateEmployee = async function (id, body) {
    let employee = await prisma.employees.update({
        where: {
            employeeid: id
        },
        data: body
    });

    return employee;
}