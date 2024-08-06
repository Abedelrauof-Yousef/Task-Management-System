import React from 'react';
import { Link } from 'react-router-dom';

const TaskItem = ({ task, onDelete }) => {
  return (
    <div style={styles.task}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <div style={styles.actions}>
        <Link to={`/edit-task/${task.id}`} className="btn" style={styles.editButton}>Edit</Link>
        <button onClick={() => onDelete(task.id)} className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
};

const styles = {
  task: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  actions: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  editButton: {
    marginRight: '10px',
  },
};

export default TaskItem;