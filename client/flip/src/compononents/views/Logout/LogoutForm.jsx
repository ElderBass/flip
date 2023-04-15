import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LogoutForm.module.css';

const LogoutForm = (props) => {
    const { onSubmit } = props;

    return (
        <div className={styles.actions}>
            <h1 className={styles.logoutHeader}>Catch you on the Flip side</h1>
            <h3 className={styles.logoutButton} onClick={onSubmit}>
                Logout
            </h3>
            <Link className={styles.cancelButton} to="/home" type="button">
                Cancel
            </Link>
        </div>
    );
};

export default LogoutForm;
