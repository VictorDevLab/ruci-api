const express = require("express");
const router = express.Router();
const data = {};
data.employees = require("../../data/employee.json");

//multiple http methods per route
router
  .route("/")
  .get((req, res) => {
    res.json(data.employees);
  })
  .post((req, res) => {
    res.json({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    });
  })
  .put((req, res) => {
    res.json({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    });
  })
  .delete((req, res) => {
    res.json({
      id: req.body.id,
    });
  });

//named parameter routes
router.route("/:id").get((req, res) => {
  res.json({
    //we are pulling directly from the url
    id: req.params.id,
  });
});

module.exports = router;
