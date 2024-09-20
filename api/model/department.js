var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.GetAllDepartments = async function () {
    const allDepartments = await prisma.departments.findMany();

    return allDepartments;
}

exports.GetDepartmentByName = async function (departmentName) {
    const department = await prisma.departments.findFirst({
        where: { name: departmentName },
    });
    return department;
}

exports.GetDepartmentById = async function (departmentId) {
    const department = await prisma.departments.findFirst({
        where: { id: departmentId },
    });
    return department;
}

exports.CreateDepartment = async function (data) {
    const newDepartment = await prisma.departments.create({
        data: {
            name: data.name,
            description: data.description,
            isactive: data.isactive,
            activationdate: new Date(),
            lead: data.lead
        }
    });

    return newDepartment;
}

exports.DeleteDepartment = async function (departmentId) {
    const deletedDepartment = await prisma.departments.delete({
        where: {
            id: departmentId
        }
    });

    return deletedDepartment;
}

exports.UpdateDepartment = async function (departmentId, data) {
    const updatedDepartment = await prisma.departments.update({
        where: {
            id: departmentId
        },
        data: data
    });

    return updatedDepartment;
}