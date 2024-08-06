import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createTask } from '../../services/taskService';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createTask({ title, description });
      history.push('/');
    } catch (err) {
      setError('Error creating task');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create New Task</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div