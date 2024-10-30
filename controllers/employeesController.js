const data = {};
data.employees = require("../models/employees.json");

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const addEmployee = (req, res) => {
  res.json({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  });
};

const updateEmployee = (req, res) => {
  res.json({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  });
};

const deleteEmployee = (req, res) => {
  res.json({
    id: req.body.id,
  });
};

const getEmployee = (req, res) => {
  res.json({
    //we are pulling directly from the url
    id: req.params.id,
  });
};

module.exports = {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}