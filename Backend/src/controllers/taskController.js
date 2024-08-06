const { Task } = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ title, description, userId: req.user.id });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id, deletedAt: null } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const [updated] = await Task.update(
      { title, description, status },
      { where: { id, userId: req.user.id } }
    );
    if (updated) {
      const updatedTask = await Task.findOne({ where: { id } });
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.update(
      { deletedAt: new Date() },
      { where: { id, userId: req.user.id } }
    );
    if (deleted) {
      res.json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};