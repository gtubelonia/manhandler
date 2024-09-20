var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();
var { matchedData, validationResult } = require('express-validator');

exports.DepartmentGetAll = async function (req, res, next) {
    const alldepartments = await prisma.departments.findMany();

    return res.status(200).send(alldepartments);
};

exports.DepartmentAdd = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req, { includeOptionals: true });

    let department = await prisma.departments.findFirst({
        where: { name: data.name },
    });

    if (department) return res.status(400).send({ msg: "This Department Already Exists" });

    const newdepartment = await prisma.departments.create({
        data: {
            name: data.name,
            description: data.description,
            isactive: data.isactive,
            activationdate: new Date(),
            lead: data.lead
        }
    })

    return res.status(200).send(newdepartment);
}

exports.DepartmentDelete = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);

    let department = await prisma.departments.findFirst({
        where: { id: parseInt(data.id) },
    });

    if (!department)
        return res.status(400).send({ msg: "This department Does Not Exist" });

    let deleteDepartment = await prisma.departments.delete({
        where: {
            id: parseInt(data.id)
        }
    })

    return res.status(200).send({
        msg: `${deleteDepartment.name} has been deleted`
    });
}

exports.DepartmentUpdate = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);
    const body = matchedData(req, { locations: ['body'] });

    let department = await prisma.departments.findFirst({
        where: { id: parseInt(data.id) },
    });

    if (!department) return res.status(400).send({ msg: "This Does Not Exist" });

    const updatedDepartment = await prisma.departments.update({
        where: {
            id: parseInt(data.id)
        },
        data: body
    })

    return res.status(200).send(updatedDepartment);
}