const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
    defaultValue: 'pending'
  },
  deletedAt: {
    type: DataTypes.DATE
  }
}, {
  timestamps: true,
  paranoid: true // This enables soft deletes
});

Task.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Task);

module.exports = Task;