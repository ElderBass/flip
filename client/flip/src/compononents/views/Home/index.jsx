import React from 'react';
import LoginForm from '../../common/LoginForm';
import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={styles.homePage}>
            <div className={styles.splash}>
                <div className={styles.logo}>
                    Flip
                </div>
                <div className={styles.blurb}>
                    Live. Laugh. Learn.
                </div>
            </div>
            <div className={styles.login}>
                <LoginForm />
            </div>
        </div>
    );
};

export default Home;
