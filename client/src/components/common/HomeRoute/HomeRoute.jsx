import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import store from '../../../store';
import Landing from '../../views/Landing';

const HomeRoute = () => {
    const { user: { isLoggedIn } } = store.getState();

    return (
        <Route exact path="/">
            {isLoggedIn ? <Redirect to="/home" /> : <Landing />}
        </Route>
    );
};

export default HomeRoute;
