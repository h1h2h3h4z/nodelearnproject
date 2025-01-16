const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { validationResult } = require("../middleware/validationCourse");
const Allcontrollers = require("../controllers/courses.controllers");
const verifyToken = require("../middleware/verifyToken");
const userRoles = require("../utils/userRoles");
const allowedTo = require("../middleware/allowedTo")
const CN = new Allcontrollers();
router.route("/").get(CN.GetAllcourses).post(verifyToken,allowedTo(userRoles.MANAGER),validationResult(), CN.AddCourse);
router
  .route("/:id")
  .get(CN.GetCourse)
  .patch(verifyToken,validationResult(), CN.UpdateCourse)
  .delete(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANAGER),CN.DeleteCourse);

module.exports = router;
