const addressesService = require('../../services/addressesService');
const { matchedData, validationResult } = require('express-validator');

exports.GetAddressByEmployeeId = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.json(result.array());
    const query = matchedData(req, { locations: ['query'] });

    const address = await addressesService.AddressGetAllByEmployeeId(query.employeeid);

    return res.status(200).send(address);
}

exports.AddAddressToEmployee = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.json(result.array());
    const query = matchedData(req, { locations: ['query'] });
    const body = matchedData(req, { locations: ['body'] });

    const newAddress = await addressesService.AddressAddToEmployee(query.employeeid, body);

    return res.status(200).send(newAddress);

}

exports.DeleteAddressFromEmployee = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.json(result.array());
    const query = matchedData(req, { locations: ['query'] });

    const deletedAddress = await addressesService.AddressDelete(query.addressid);
    
    return res.status(200).send({
        msg: `${deletedAddress.address1} has been deleted`
    });
}

exports.UpdateAddressForEmployee = async function(req,res,next){
    const result = validationResult(req);
    if (!result.isEmpty()) return res.json(result.array());
    const query = matchedData(req, { locations: ['query'] });
    const body = matchedData(req, { locations: ['body'] });

    const updatedAddress = await addressesService.AddressUpdate(query.Id, body);
    
    return res.status(200).json(updatedAddress);
}