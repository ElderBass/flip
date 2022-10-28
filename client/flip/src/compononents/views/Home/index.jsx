import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import LoginForm from '../../common/LoginForm';
import SignupForm from '../../common/SignupForm';
import SignupLoginToggle from '../../common/SignupLoginToggle';
import styles from './Home.module.css';

const Home = () => {
    const [flipped, setFlipped] = useState(false);

    const SIGNUP_TEXT = "Haven't Flipped yet? Sign up for free";
    const LOGIN_TEXT = 'Already Flipped? Login instead';

    const onClick = () => setFlipped(!flipped);

    const toggleText = flipped ? LOGIN_TEXT : SIGNUP_TEXT;

    return (
        <div className={styles.homePage}>
            <div className={styles.splash}>
                <div className={styles.logo}>Flip</div>
                <div className={styles.blurb}>Live. Laugh. Learn.</div>
            </div>
            <div className={styles.loginSignup}>
                <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
                    <LoginForm />
                    <SignupForm />
                </ReactCardFlip>
                <SignupLoginToggle text={toggleText} onClick={onClick} />
            </div>
        </div>
    );
};

export default Home;
