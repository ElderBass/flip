import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch, useHistory } from 'react-router-dom';
import Logout from './compononents/views/Logout/Logout';
import styles from './App.module.css';
import Home from './compononents/views/Home';
import UserHome from './compononents/views/UserHome';
import CreateDeck from './compononents/views/CreateDeck';
import Deck from './compononents/views/Deck';

function App() {
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('userLoggedIn') === true) {
            history.push('/home');
        }
    }, [history]);

    return (
        <Router>
            <div className={styles.mainContainer}>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    {/* <Route exact path='/home'>
            {isLoggedIn ? (
              <UserHome />
            ) : (
              <Redirect to='/' />
            )}
          </Route> */}
                    <Route exact path="/home" component={UserHome} />
                    <Route exact path="/create-deck" component={CreateDeck} />
                    <Route exact path="/edit-deck" component={CreateDeck} />
                    <Route exact path="/deck" component={Deck} />
                    <Route exact path="/logout" component={Logout} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
