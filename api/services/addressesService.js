const addressModel = require('../model/address')

exports.AddressGetAllByEmployeeId = async function (id) {
    const employeeId = parseInt(id);

    const allAddress = await addressModel.GetAddressByEmployeeId(employeeId);

    return allAddress;
};

exports.AddressAddToEmployee = async function (id, data) {
    const employeeId = parseInt(id)
    const address = await addressModel.GetAddressByEmployeeId()
    if (address) throw { status: 400, message: "This Address Number Already Exists" };
    const newAddress = await addressModel.AddAddressToEmployee(employeeId, data);

    return newAddress;
}

exports.AddressDelete = async function (id) {
    const addressId = parseInt(id);
    const address = await addressModel.GetAddressByAddressId(addressId);
console.log(address);
    if (!address)
        throw { status: 400, message: "This Address Does Not Exist" };

    const deletedAddress = await addressModel.DeleteAddress(addressId)

    return deletedAddress;
}

exports.AddressUpdate = async function (id, body) {
    const addressId = parseInt(id);
    const address = await addressModel.GetAddressByAddressId(addressId);

    if (!address) throw { status: 400, message: "This Does Not Exist" };

    const updatedAddress = await addressModel.UpdateAddress()

    return updatedAddress;
}