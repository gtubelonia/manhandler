const { matchedData, validationResult } = require('express-validator');
const resourceModel = require('../model/resource');

exports.ResourceGetAll = async function () {
    const allResources = await resourceModel.GetAllResources();

    return allResources;
}

exports.ResourceAdd = async function (body) {
    let resource = await resourceModel.GetResourceByName(body.name);

    if (resource)
        throw { status: 400, message: "This Resource Already Exists" };

    const newResource = await resourceModel.CreateResource(body);
    return newResource;
}

exports.ResourceUpdate = async function (id, body) {
    let resourceId = parseInt(id);
    let resource = await resourceModel.GetResourceById(resourceId);

    if (!resource) throw { status: 400, message: "This Resource Does Not Exist" };

    const updatedResource = await resourceModel.UpdateResourceById(resourceId, body);

    return updatedResource;
}

exports.ResourceDelete = async function (id) {
    let resourceId = parseInt(id);

    let resource = await resourceModel.GetResourceById(resourceId);

    if (!resource) throw { status: 400, message: "This Resource Does Not Exist" };

    let deleteResource = await resourceModel.DeleteResourceById(resourceId);

    return deleteResource
}