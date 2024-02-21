// Routes.js
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';

const Routes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Example function to check if user is authenticated
  const checkAuth = () => {
    // Implement your authentication logic here
    // Example: check if user is logged in
    return isLoggedIn;
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {checkAuth() ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default Routes;
