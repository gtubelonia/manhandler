var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.GetAllResources = async function () {
    let allResources = await prisma.systemresources.findMany();
    return allResources;
}

exports.GetResourceByName = async function (name) {
    console.log(name)
    let resource = await prisma.systemresources.findFirst({
        where: { name: name },
    });
    return resource;
}

exports.CreateResource = async function (data) {
    let resource = await prisma.systemresources.create({
        data: data
    });

    return resource;
}

exports.GetResourceById = async function (resourceId) {
    let resource = await prisma.systemresources.findFirst({
        where: { id: resourceId }
    });

    return resource;
}

exports.UpdateResourceById = async function (resourceId, body) {
    let updateResource = await prisma.systemresources.update({
        where: {
            id: resourceId
        },
        data: body
    })
    return updateResource;
}

exports.DeleteResourceById = async function (resourceId){
    let deleteResource = await prisma.systemresources.delete({
        where: {
            id: resourceId
        }
    })
return deleteResource;
}