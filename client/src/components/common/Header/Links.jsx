import React from 'react';
import store from '../../../store';
import Username from './Username';
import LogoutLink from './LogoutLink';
import styles from './Links.module.css';
import ProfileLink from '../ProfileLink';

const Links = () => {
    const { user } = store.getState();

    return (
        <div className={styles.linksContainer}>
            <ul className={styles.linksList}>
                <Username username={user.username} />
                <ProfileLink />
                <LogoutLink />
            </ul>
        </div>
    );
};

export default Links;
