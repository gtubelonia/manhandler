var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();
var { matchedData, validationResult } = require('express-validator');

async function AddressGetAllByEmployeeId(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);

    const allAddresss = await prisma.address.findMany({
        where: {
            employeeid: parseInt(data.employeeid)
        }
    });

    return res.status(200).send(allAddresss);
};

async function AddressAddToEmployee(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);
    console.log(data)
    let address = await prisma.address.findFirst({
        where: {
            employeeid: parseInt(data.employeeid)
        },
    });

    if (address) return res.status(400).send({ msg: "This Address Number Already Exists" });

    const newAddress = await prisma.address.create({
        data: {
            employeeid: parseInt(data.employeeid),
            address1: data.address1,
            address2: data.address2,
            city: data.city,
            state: data.state,
            zipcode: data.zipcode
        }
    })

    return res.status(200).send(newAddress);
}

async function AddressDelete(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);

    let address = await prisma.address.findFirst({
        where: { addressid: parseInt(data.addressid) },
    });

    if (!address)
        return res.status(400).send({ msg: "This Address Does Not Exist" });

    let deleteAddress = await prisma.address.delete({
        where: {
            addressid: parseInt(data.addressid)
        }
    })

    return res.status(200).send({
        msg: `${deleteAddress.address1} has been deleted`
    });
}

async function AddressUpdate(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);
    const body = matchedData(req, { locations: ['body'] });

    let address = await prisma.address.findFirst({
        where: { addressid: parseInt(data.addressid) },
    });

    if (!address) return res.status(400).send({ msg: "This Does Not Exist" });

    const updatedAddress = await prisma.address.update({
        where: {
            addressid: parseInt(data.addressid)
        },
        data: body
    })

    return res.status(200).send(updatedAddress);
}


module.exports = {
    AddressGetAllByEmployeeId,
    AddressAddToEmployee,
    AddressDelete,
    AddressUpdate,
}