import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import store from './store';
import Logout from './compononents/views/Logout/Logout';
import styles from './App.module.css';
import Home from './compononents/views/Home';
import UserHome from './compononents/views/UserHome';
import CreateDeck from './compononents/views/CreateDeck';
import Deck from './compononents/views/Deck';

function App() {
    const { user } = store.getState();

    return (
        <Router>
            <div className={styles.mainContainer}>
                <Switch>
                    <Route exact path="/">
                        {user && user.isLoggedIn ? <Redirect to="/home" /> : <Home />}
                    </Route>
                    <Route exact path="/home">
                        <UserHome />
                    </Route>
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
