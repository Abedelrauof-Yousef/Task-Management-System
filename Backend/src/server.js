const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
  dialect: 'postgres',
});

// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Unable to connect to the database:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;