const departmentModel = require('../model/department')

exports.DepartmentGetAll = async function () {
    const allDepartments = await departmentModel.GetAllDepartments();
    return allDepartments;
};

exports.DepartmentAdd = async function (data) {
    let department = await departmentModel.GetDepartmentByName(data.name);

    if (department) throw { status: 400, message: "This Department Already Exists" };

    const newDepartment = await departmentModel.CreateDepartment(data);
    return newDepartment;
}

exports.DepartmentDelete = async function (id) {
    const departmentId = parseInt(id);
    const department = await departmentModel.GetDepartmentById(departmentId);
    if (!department)
        throw { status: 400, message: "This department Does Not Exist" };

    const deletedDepartment = await departmentModel.DeleteDepartment(departmentId);

    return deletedDepartment;
}

exports.DepartmentUpdate = async function (id, data) {
    const departmentId = parseInt(id);
    const department = await departmentModel.GetDepartmentById(departmentId);

    if (!department) throw { status: 400, message: "This department Does Not Exist" };

    const updatedDepartment = await departmentModel.UpdateDepartment(departmentId, data);

    return updatedDepartment;
}