const phonesService = require('../../services/phonesService');
const { matchedData, validationResult } = require('express-validator');

exports.GetEmployeePhones = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const query = matchedData(req, { locations: 'query' });

    let allPhones = await phonesService.PhoneGetAllByEmployeeId(query.employeeid)

    return res.status(200).send(allPhones);
}

exports.AddPhoneToUser = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const query = matchedData(req, { locations: 'query' });
    const body = matchedData(req, { locations: 'body' });

    let newPhone = await phonesService.PhoneAddToUser(query.employeeid, body);

    return res.status(200).send(newPhone);
}

exports.DeletePhoneFromUser = async function (req, res, next) {
    let result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    let data = matchedData(req);

    let deletePhone = await phonesService.PhoneDelete(data.id);

    return res.status(200).send({
        msg: `${deletePhone.phonenumber} has been deleted`
    });
}

exports.UpdatePhoneForUser = async function (req, res, next) {
    let result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    let query = matchedData(req, { locations: ['query'] });
    let body = matchedData(req, { locations: ['body'] });

    let updatePhone = await phonesService.PhoneUpdate(query.id, body);

    return res.status(200).send(updatePhone);
}