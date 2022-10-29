import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import LoginForm from '../../common/LoginForm';
import SignupForm from '../../common/SignupForm';
import SignupLoginToggle from '../../common/SignupLoginToggle';
import styles from './Home.module.css';

const Home = () => {
    const [flipped, setFlipped] = useState(false);
    const [error, setError] = useState('');

    const SIGNUP_TEXT = "Haven't Flipped yet? Sign up free here";
    const LOGIN_TEXT = 'Already Flipped? Login here instead';

    const onToggleClick = () => {
        setFlipped(!flipped);
        setError('');
    };

    const toggleText = flipped ? LOGIN_TEXT : SIGNUP_TEXT;

    return (
        <div className={styles.homePage}>
            <div className={styles.splash}>
                <div className={styles.logo}>Flip</div>
                <div className={styles.blurb}>Live. Laugh. Learn.</div>
            </div>
            <div className={styles.loginSignup}>
                <div className={styles.error}>
                    {error && <p className={styles.errorMsg}>{error}</p>}
                </div>
                <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
                    <LoginForm setError={setError} />
                    <SignupForm setError={setError} />
                </ReactCardFlip>
                <SignupLoginToggle text={toggleText} onClick={onToggleClick} />
            </div>
        </div>
    );
};

export default Home;
