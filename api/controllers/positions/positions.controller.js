const positionsService = require('../../services/positionsService');
const { matchedData, validationResult } = require('express-validator');

exports.GetAllPositions = async function (req, res, next) {
    let allPositions = await positionsService.PositionGetAll();

    return res.status(200).send(allPositions);
}

exports.AddPosition = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);

    let newPosition = await positionsService.PositionAdd(data);

    return res.status(200).send(newPosition);
}

exports.DeletePosition = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);

    let deletedPosition = await positionsService.PositionDelete(data.id);

    return res.status(200).send(
        {
            msg: `${deletedPosition.name} has been deleted`
        }
    );
}

exports.UpdatePosition = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const query = matchedData(req, { locations: ['query'] });
    const body = matchedData(req, { locations: ['body'] });

    let updatedPosition = await positionsService.PositionUpdate(query.id, body);

    return res.status(200).send(updatedPosition);
}