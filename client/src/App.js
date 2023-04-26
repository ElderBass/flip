import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import AuthRoute from './compononents/common/AuthRoute';
import Logout from './compononents/views/Logout';
import Home from './compononents/views/Home';
import CreateDeck from './compononents/views/CreateDeck';
import Deck from './compononents/views/Deck';
import Study from './compononents/views/Study';
import Browse from './compononents/views/Browse';
import UserPage from './compononents/views/UserPage';
import styles from './App.module.css';
import Stats from './compononents/views/Stats';
import HomeRoute from './compononents/common/HomeRoute/HomeRoute';

function App() {
    return (
        <Router>
            <div className={styles.mainContainer}>
                <Switch>
                    <AuthRoute exact path="/home" component={Home} />
                    <AuthRoute path="/user/:userId" component={UserPage} />
                    <AuthRoute exact path="/create-deck" component={CreateDeck} />
                    <AuthRoute exact path="/edit-deck" component={CreateDeck} />
                    <AuthRoute exact path="/study" component={Study} />
                    <AuthRoute exact path="/deck" component={Deck} />
                    <AuthRoute exact path="/stats" component={Stats} />
                    <AuthRoute exact path="/browse" component={Browse} />
                    <AuthRoute exact path="/logout" component={Logout} />
                    <HomeRoute />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
