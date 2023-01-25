import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Logout from './compononents/views/Logout';
import styles from './App.module.css';
import Home from './compononents/views/Home';
import UserHome from './compononents/views/UserHome';
import CreateDeck from './compononents/views/CreateDeck';
import Deck from './compononents/views/Deck';
import Study from './compononents/views/Study';
import Browse from './compononents/views/Browse';

function App() {
    return (
        <Router>
            <div className={styles.mainContainer}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={UserHome} />
                    <Route exact path="/create-deck" component={CreateDeck} />
                    <Route exact path="/edit-deck" component={CreateDeck} />
                    <Route exact path="/study" component={Study} />
                    <Route exact path="/deck" component={Deck} />
                    <Route exact path="/browse" component={Browse} />
                    <Route exact path="/logout" component={Logout} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
