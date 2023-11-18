import React from 'react';
import { useHistory } from 'react-router-dom';
import LogoutForm from './LogoutForm';
import { logout } from '../../../utils/logout';
import { PAGES } from '../../../utils/constants';
import styles from './Logout.module.css';

const Logout = () => {
    const history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault();
        await logout();
        history.push(PAGES.LANDING);
    };

    return (
        <div className={styles.logoutPage}>
            <LogoutForm onSubmit={onSubmit} />
        </div>
    );
};

export default Logout;
