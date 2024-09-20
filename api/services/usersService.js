
const hasher = require('../utils/hash');
const userModel = require('../model/user');

exports.UserRegister = async function (data) {

    let user = await userModel.GetUserByEmail(data.email);
    if (user) {
        throw { status: 400, message: "This User Already Exists" };
    }

    let hashword = await hasher.argonHash(data.password);
    let newUser = await userModel.CreateNewUser(data, hashword);

    return newUser;
};

exports.UserDeactivate = async function (id) {
    let userId = parseInt(id);
    let user = await userModel.GetUserById(userId);

    if (!user)
        throw { status: 400, message: "This User Does Not Exist" };
    if (!user.active)
        throw { status: 400, message: "This User Has Already Been Deactivated" };

    let data = {
        active: false,
        deactivatedate: new Date()
    }

    let updateUser = userModel.UpdateUserById(userId, data);

    return updateUser
}

exports.UserActivate = async function (id) {
    let userId = parseInt(id);

    let user = await userModel.GetUserById(userId);

    if (!user)
        throw { status: 400, message: "This User Does Not Exist" };
    if (user.active)
        throw { status: 400, message: "This User Is Already Active" };

    let data = {
        active: true,
        deactivatedate: null
    };

    let updateUser = userModel.UpdateUserById(userId, data);

    return updateUser;
}

exports.UserGetAll = async function () {
    const allUsers = await userModel.GetAllUsers();
    return allUsers;
}
