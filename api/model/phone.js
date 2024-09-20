var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.GetAllPhonesByEmployeeId = async function (employeeid) {
    let phones = await prisma.phone.findMany({
        where: {
            employeeid: employeeid
        }
    });

    return phones;
};

exports.GetPhoneByNumber = async function (number) {
    let phone = await prisma.phone.findFirst({
        where: {
            countrycode: number.countrycode,
            areacode: number.areacode,
            phonenumber: number.phonenumber,
        },
    });

    return phone;
};

exports.GetPhoneById = async function (id) {
    let phone = await prisma.phone.findFirst({
        where: { id: id },
    });
    return phone;
};

exports.CreatePhone = async function (employeeId, data) {
    let newPhone = await prisma.phone.create({
        data: {
            countrycode: data.countrycode,
            areacode: data.areacode,
            phonenumber: data.phonenumber,
            phonetype: data.phonetype,
            employeeid: employeeId
        }
    });

    return newPhone;
};

exports.DeletePhone = async function (phoneId) {
    let deletePhone = await prisma.phone.delete({
        where: {
            id: phoneId
        }
    });

    return deletePhone;
};

exports.UpdatePhone = async function (phoneId, data) {
    let updatePhone = await prisma.phone.update({
        where: {
            id: phoneId
        },
        data: data
    });
    return updatePhone;
}