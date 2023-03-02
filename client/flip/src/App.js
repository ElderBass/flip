import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Logout from './compononents/views/Logout';
import Landing from './compononents/views/Landing';
import Home from './compononents/views/Home';
import CreateDeck from './compononents/views/CreateDeck';
import Deck from './compononents/views/Deck';
import Study from './compononents/views/Study';
import Browse from './compononents/views/Browse';
import UserPage from './compononents/views/UserPage';
import styles from './App.module.css';

function App() {
    return (
        <Router>
            <div className={styles.mainContainer}>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/home" component={Home} />
                    <Route path="/user/:userId" component={UserPage} />
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
