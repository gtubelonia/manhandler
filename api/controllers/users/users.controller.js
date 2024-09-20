const usersService = require('../../services/usersService');
const { matchedData, validationResult } = require('express-validator');
const { ToUserDto } = require('./dtos/userDto');

exports.GetAllUsers = async function (req, res, next) {
    let users = await usersService.UserGetAll();

    return res.status(200).json(users);
}
exports.RegisterUser = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.json(result.array());
    const data = matchedData(req);

    let newUser = await usersService.UserRegister(data);

    return res.status(201).json(ToUserDto(newUser));
}

exports.DeactivateUser = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const query = matchedData(req, { locations: ['query'] });

    let updateUser = await usersService.UserDeactivate(query.id)
    return res.status(200).json({
        msg: `${updateUser.username} has been deactivated`
    });
}

exports.ActivateUser = async function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const query = matchedData(req, { locations: ['query'] });

    let updateUser = await usersService.UserActivate(query.id)
    
    return res.status(200).json({
        msg: `${updateUser.username} has been activated`
    });
}