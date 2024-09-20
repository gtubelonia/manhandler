const positionsModel = require('../model/position');


exports.PositionGetAll = async function (req, res, next) {
    const allPositions = await positionsModel.GetAllPositions();

    return allPositions;
};

exports.PositionAdd = async function (data) {
    let position = await positionsModel.GetPositionByName(data.name);

    if (position) throw { status: 400, message: "This Position Already Exists" };

    let newPosition = await positionsModel.CreatePosition(data);

    return newPosition;
}

exports.PositionDelete = async function (id) {
    let positionId = parseInt(id);

    let position = await positionsModel.GetPositionById(positionId);

    if (!position)
        return res.status(400).send({ msg: "This position Does Not Exist" });

    let deletePosition = positionsModel.DeletePosition(positionId);

    return deletePosition;
}

exports.PositionUpdate = async function (id, data) {
    let positionId = parseInt(id);

    let position = await positionsModel.GetPositionById(positionId);

    if (!position) return res.status(400).send({ msg: "This Does Not Exist" });

    let updatedPosition = await positionsModel.UpdatePosition(positionId, data);

    return updatedPosition;
}