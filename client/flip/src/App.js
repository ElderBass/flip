import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch, useHistory } from 'react-router-dom';
import Logout from './compononents/views/Logout/Logout';
import styles from './App.module.css';
import Home from './compononents/views/Home';
import UserHome from './compononents/views/UserHome';

function App() {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('userLoggedIn') === true) {
      history.push('/home');
    }
  }, []);

  return (
    <Router>
      <div className={styles.mainContainer}>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/home' component={UserHome} />
          <Route exact path='/logout' component={Logout} />
        </Switch>

        {/*
        <Route exact path='/decks/create'>
          {isLoggedIn ? (
            <CreatePostPage />
          ) : (
            <Redirect to='/' />
          )}
        </Route> */}
      </div>
    </Router>
  );
}

export default App;
