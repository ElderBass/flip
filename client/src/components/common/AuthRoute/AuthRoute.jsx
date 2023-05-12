import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import store from '../../../store';

const AuthRoute = (props) => {
    const { user: { isLoggedIn } } = store.getState();

    return isLoggedIn ? <Route {...props} /> : <Redirect to="/" />;
};

export default AuthRoute;
