const express = require("express");
const taskController = require("../controllers/taskControllers");
const route = express.Router();
const auth = require("../middlewares/auth");
route.post("/addTasks", auth, taskController.addTask);
route.get("/getTasks", auth, taskController.getTasks);
route.put("/updateTask", auth, taskController.updateTask);
route.put("/deleteTask", auth, taskController.deleteTask);

module.exports = route;
