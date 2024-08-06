import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import TaskList from './components/Tasks/TaskList';
import CreateTask from './components/Tasks/CreateTask';
import EditTask from './components/Tasks/EditTask';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="container">
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <PrivateRoute exact path="/" component={TaskList} />
              <PrivateRoute exact path="/create-task" component={CreateTask} />
              <PrivateRoute exact path="/edit-task/:id" component={EditTask} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;