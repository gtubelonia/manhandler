var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.GetAddressByEmployeeId = async function (employeeId) {
    const address = await prisma.address.findFirst({
        where: {
            employeeid: employeeId
        }
    });
    return address;
}

exports.GetAddressByAddressId = async function (addressId) {
    const address = await prisma.address.findFirst({
        where: { addressid: addressId },
    });
    return address;
}

exports.AddAddressToEmployee = async function (employeeId, data) {
    const newAddress = await prisma.address.create({
        data: {
            employeeid: employeeId,
            address1: data.address1,
            address2: data.address2,
            city: data.city,
            state: data.state,
            zipcode: data.zipcode
        }
    });
    return newAddress;
}

exports.DeleteAddress = async function (addressId) {
    const deletedAddress = await prisma.address.delete({
        where: { addressid: addressId },
    });
    return deletedAddress;
}

exports.UpdateAddress = async function(addressId, data){
    const updatedAddress = await prisma.address.update({
        where: {
            addressid: parseInt(data.addressid)
        },
        data: data
    });
    return updatedAddress
}