const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController")

//multiple http methods per route
router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(employeesController.addEmployee)
  .put(employeesController.updateEmployee)
  .delete(employeesController.deleteEmployee);

//named parameter routes
router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
