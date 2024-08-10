const Tasks = require("../models/tasks");

exports.addTask = async (req, res) => {
  const { description, title, user_id } = req.body;
  console.log(req.user);
  try {
    const task = await Tasks.makeTasks({
      description: description,
      title: title,
      user_id: req.user.user_id,
    });
    res.status(201).json(task);
  } catch (e) {
    res.status(501).json({ message: "Internal server error" }, e);
  }
};

exports.getTasks = async (req, res) => {
  try {
    let user_id = req.user.user_id;
    let task = await Tasks.getTasks({ user_id: user_id });
    console.log(task);
    res.status(201).json(task);
  } catch (e) {
    res.status(501).json(e);
  }
};

exports.updateTask = async (req, res) => {
  try {
    let { description, title, task_id } = req.body;
    let task = await Tasks.updateTask({
      description: description,
      title: title,
      task_id: task_id,
    });
    res.status(201).json(task);
  } catch (e) {
    res.status(501).json(e);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    let { task_id, isDeleted } = req.body;
    let task = await Tasks.deleteTask({
      isDeleted: isDeleted,
      task_id: task_id,
    });
    res.status(201).json(task);
  } catch (e) {
    res.status(501).json(e);
  }
};
