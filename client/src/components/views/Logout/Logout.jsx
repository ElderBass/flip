import React from 'react';
import { useHistory } from 'react-router-dom';
import store from '../../../store';
import * as UserActions from '../../../store/actions/user.js';
import { LOCAL_STORAGE_KEYS } from '../../../utils/constants';
import styles from './Logout.module.css';
import LogoutForm from './LogoutForm';

const Logout = () => {
    const history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault();
        localStorage.setItem(LOCAL_STORAGE_KEYS.LOGGED_IN, false);
        await store.dispatch(UserActions.logoutUser());
        history.push('/');
    };

    return (
        <div className={styles.logoutPage}>
            <LogoutForm onSubmit={onSubmit} />
        </div>
    );
};

export default Logout;
