import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header style={styles.header}>
      <div className="container" style={styles.headerContent}>
        <h1 style={styles.logo}>Task Manager</h1>
        <nav>
          {isAuthenticated ? (
            <>
              <Link to="/" style={styles.navLink}>Tasks</Link>
              <Link to="/create-task" style={styles.navLink}>Create Task</Link>
              <button onClick={logout} style={styles.logoutButton}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.navLink}>Login</Link>
              <Link to="/signup" style={styles.navLink}>Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#333',
    color: 'white',
    padding: '10px 0',
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    margin: 0,
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    marginLeft: '20px',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    marginLeft: '20px',
  },
};

export default Header;