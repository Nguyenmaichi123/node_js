const express = require("express");
const router = express.Router();
const userController = require("../controllers/testControllers");

router.get("/users", userController.getAllCourses);

module.exports = router;
