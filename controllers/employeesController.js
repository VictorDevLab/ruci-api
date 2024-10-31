const data = {
  employees: require("../models/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const addEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees?.length ? data.employees[data.employees.length - 1].id + 1 : 1,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }

  if(!newEmployee.first_name || !newEmployee.last_name) {
    return res.status(400).json({"message": "First name and last name are required!"})
  }

  data.setEmployees([...data.employees, newEmployee])
  res.status(201).json(data.employees)
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
  getEmployee,
};
