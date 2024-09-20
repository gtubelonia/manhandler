const resourcesService = require('../../services/resourcesService');
const { matchedData, validationResult } = require('express-validator');

exports.GetAll = async function (req, res, next) {
    allResources = await resourcesService.ResourceGetAll();

    return res.status(200).send(allResources);
}

exports.CreateResource = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const body = matchedData(req, { locations: ['body'] });

    let newResource = await resourcesService.ResourceAdd(body);

    return res.status(200).send(newResource);
}

exports.UpdateResource = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const body = matchedData(req, { locations: ['body'] });
    const query = matchedData(req, { locations: ['query'] })

    let updateResource = await resourcesService.ResourceUpdate(query.id, body)

    return res.status(200).send(updateResource);
}

exports.DeleteResource = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const body = matchedData(req, { locations: ['body'] });
    const query = matchedData(req, { locations: ['query'] })

    let deleteResource = await resourcesService.ResourceDelete(query.id);

    return res.status(200).send({
        msg: `${deleteResource.name} has been deleted`
    });
}