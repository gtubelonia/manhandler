const phonesModel = require('../model/phone');

exports.PhoneGetAllByEmployeeId = async function (id) {
    let employeeId = parseInt(id)
    console.log(employeeId)
    let allPhones = await phonesModel.GetAllPhonesByEmployeeId(employeeId);

    return allPhones;
};

exports.PhoneAddToUser = async function (id, data) {
    let employeeId = parseInt(id);

    let phone = await phonesModel.GetPhoneByNumber(data);

    if (phone) throw { status: 400, message: "This Phone Number Already Exists" };

    let newPhone = phonesModel.CreatePhone(employeeId, data);

    return newPhone;
}

exports.PhoneDelete = async function (id) {
    let phoneId = parseInt(id)

    let phone = await phonesModel.GetPhoneById(phoneId);

    if (!phone)
        throw { status: 400, message: "This Phone Does Not Exist" };

    let deletePhone = await phonesModel.DeletePhone(phoneId);

    return deletePhone;
}

exports.PhoneUpdate = async function (id, body) {
    let phoneId = parseInt(id);

    let phone = await phonesModel.GetPhoneById(phoneId);

    if (!phone) throw { status: 400, message: "This Phone Does Not Exist" };

    const updatePhone = await phonesModel.UpdatePhone(phoneId, body);

    return updatePhone;
}