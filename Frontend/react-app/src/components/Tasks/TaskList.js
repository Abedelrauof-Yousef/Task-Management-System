import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTasks, deleteTask } from '../../services/taskService';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Error fetching tasks');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Error deleting task');
    }
  };

  return (
    <div>
      <h2>Your Tasks</h2>
      {error && <p className="error">{error}</p>}
      <Link to="/create-task" className="btn" style={styles.createButton}>Create New Task</Link>
      <div style={styles.taskList}>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={() => handleDelete(task.id)}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  createButton: {
    marginBottom: '20px',
  },
  taskList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
};

export default TaskList;