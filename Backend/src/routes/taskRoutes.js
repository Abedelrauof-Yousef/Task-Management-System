const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// Get all tasks for the authenticated user
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
});

// Get a specific task
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error: error.message });
  }
});

// Create a new task
router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description } = req.body;
    const task = await Task.create({ title, description, userId: req.user.id });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
});

// Update a task
router.put('/:id', [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional(),
  body('status').optional().isIn(['pending', 'in_progress', 'completed']).withMessage('Invalid status')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const [updated] = await Task.update(req.body, {
      where: { id: req.params.id, userId: req.user.id }
    });
    if (updated) {
      const updatedTask = await Task.findOne({ where: { id: req.params.id } });
      return res.json(updatedTask);
    }
    throw new Error('Task not found');
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
});

// Delete a task (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Task.destroy({
      where: { id: req.params.id, userId: req.user.id }
    });
    if (deleted) {
      return res.json({ message: 'Task deleted successfully' });
    }
    throw new Error('Task not found');
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
});

module.exports = router;