import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import store from './store';
import Logout from './compononents/views/Logout';
import Landing from './compononents/views/Landing';
import Home from './compononents/views/Home';
import CreateDeck from './compononents/views/CreateDeck';
import Deck from './compononents/views/Deck';
import Study from './compononents/views/Study';
import Browse from './compononents/views/Browse';
import UserPage from './compononents/views/UserPage';
import styles from './App.module.css';
import { LOCAL_STORAGE_KEYS } from './utils/constants';
import Stats from './compononents/views/Stats';

function App() {
    const { user: { isLoggedIn } } = store.getState();

    const [routeToHome, setRouteToHome] = useState(false);

    useEffect(() => {
        const userLoggedIn = localStorage.getItem(LOCAL_STORAGE_KEYS.LOGGED_IN);
        if (isLoggedIn && userLoggedIn === 'true') {
            setRouteToHome(true);
        }
    }, [isLoggedIn]);

    return (
        <Router>
            <div className={styles.mainContainer}>
                <Switch>
                    <Route exact path="/">
                        {routeToHome ? <Home /> : <Landing />}
                    </Route>
                    <Route exact path="/landing" component={Landing} />
                    <Route exact path="/home" component={Home} />
                    <Route path="/user/:userId" component={UserPage} />
                    <Route exact path="/create-deck" component={CreateDeck} />
                    <Route exact path="/edit-deck" component={CreateDeck} />
                    <Route exact path="/study" component={Study} />
                    <Route exact path="/deck" component={Deck} />
                    <Route exact path="/stats" component={Stats} />
                    <Route exact path="/browse" component={Browse} />
                    <Route exact path="/logout" component={Logout} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
