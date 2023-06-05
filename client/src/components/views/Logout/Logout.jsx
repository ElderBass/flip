import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Logout.module.css';
import LogoutForm from './LogoutForm';
import { logout } from '../../../utils/logout';

const Logout = () => {
    const history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault();
        await logout();
        history.push('/');
    };

    return (
        <div className={styles.logoutPage}>
            <LogoutForm onSubmit={onSubmit} />
        </div>
    );
};

export default Logout;
