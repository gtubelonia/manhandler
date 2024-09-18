var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();
var { matchedData, validationResult } = require('express-validator');

async function PhoneGetAllByEmployeeId(req, res, next) {
    const allPhones = await prisma.phone.findMany({
        where: {
            employeeid: parseInt(data.id)
        }
    });

    return res.status(200).send(allPhones);
};

async function PhoneAddToUser(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);

    let phone = await prisma.phone.findFirst({
        where: {
            countrycode: data.countrycode,
            areacode: data.areacode,
            phonenumber: data.phonenumber
        },
    });

    if (phone) return res.status(400).send({ msg: "This Phone Number Already Exists" });

    const newPhone = await prisma.phone.create({
        data: {
            countrycode: data.countrycode,
            areacode: data.areacode,
            phonenumber: data.phonenumber,
            phonetype: data.phonetype,
            employeeid: parseInt(data.employeeid)
        }
    })

    return res.status(200).send(newPhone);
}

async function PhoneDelete(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);

    let phone = await prisma.phone.findFirst({
        where: { id: parseInt(data.id) },
    });

    if (!phone)
        return res.status(400).send({ msg: "This Phone Does Not Exist" });

    let deletePhone = await prisma.phone.delete({
        where: {
            id: parseInt(data.id)
        }
    })

    return res.status(200).send({
        msg: `${deletePhone.phonenumber} has been deleted`
    });
}

async function PhoneUpdate(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);
    const body = matchedData(req, { locations: ['body'] });

    let phone = await prisma.phone.findFirst({
        where: { id: parseInt(data.id) },
    });

    if (!phone) return res.status(400).send({ msg: "This Does Not Exist" });

    const updatedPhone = await prisma.phone.update({
        where: {
            id: parseInt(data.id)
        },
        data: body
    })

    return res.status(200).send(updatedPhone);
}


module.exports = {
    PhoneGetAllByEmployeeId,
    PhoneAddToUser,
    PhoneDelete,
    PhoneUpdate,
}