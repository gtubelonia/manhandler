const employeesModel = require('../model/employee');

exports.EmployeesGetAll = async function () {
    const employees = await employeesModel.GetAllEmployees();

    return employees;
}

exports.EmployeesAdd = async function (data) {

    let employee = await employeesModel.GetEmployeeByName(data)

    if (employee)
        throw { status: 400, message: "This Employee Already Exists" };

    data.payrate = parseInt(data.payrate);

    const newEmployee = await employeesModel.CreateEmployee(data);

    return newEmployee;
}

exports.EmployeesUpdate = async function (id, data) {
    let employeeId = parseInt(id);
    data.payrate = parseInt(data.payrate);
    let employee = await employeesModel.GetEmployeeById(employeeId);

    if (!employee) throw { status: 400, message: "This Employee Does Not Exist" };

    const updatedEmployee = await employeesModel.UpdateEmployee(employeeId, data);

    return updatedEmployee;
}

exports.EmployeesDeactivate = async function (id) {
    let employeeId = parseInt(id);
    let employee = await employeesModel.GetEmployeeById(employeeId);

    if (!employee) throw { status: 400, message: "This Employee Does Not Exist" };

    let data = {
        active: false,
        enddate: new Date()
    }

    const deactivateEmployee = await employeesModel.UpdateEmployee(employeeId, data);

    return deactivateEmployee;
}