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
    id: data.employees?.length
      ? data.employees[data.employees.length - 1].id + 1
      : 1,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  };

  if (!newEmployee.first_name || !newEmployee.last_name) {
    return res
      .status(400)
      .json({ message: "First name and last name are required!" });
  }

  data.setEmployees([...data.employees, newEmployee]);
  //201--> created the new record
  res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );

  if (req.body.first_name) employee.first_name = req.body.first_name;
  if (req.body.last_name) employee.last_name = req.body.last_name;

  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );

  const unSortedEmployees = [...filteredArray, employee];
  const sortedEmployees = unSortedEmployees.sort((a, b) =>
    a.id > b.id ? 1 : a.id < b.id ? -1 : 0
  );
  data.setEmployees(sortedEmployees);
  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    res.status(400).json({ Message: `Employee ID ${req.body.id} not found!` });
  }
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  data.setEmployees(filteredArray);
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );
  if (!employee) {
    res
      .status(400)
      .json({ Message: `Employee ID ${req.params.id} not found!` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
