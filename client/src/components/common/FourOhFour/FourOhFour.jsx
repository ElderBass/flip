import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './FourOhFour.module.css';

const FourOhFour = () => {
    const history = useHistory();

    const goBack = () => history.goBack();

    const goHome = () => history.push('/home');

    return (
        <div className={styles.fourOhFourContainer}>
            <div className={styles.fourOhFourStuff}>
                <h2>What the Flip?!</h2>
                <h4>Looks like you stumbled into no man's land. Sorry about that!</h4>
                <p>Click to go home or go back to the previous page:</p>
                <div className={styles.actions}>
                    <button
                        className={`${styles.button} ${styles.goBack}`}
                        onClick={goBack}
                    >
                        Go Back
                    </button>
                    <button
                        className={`${styles.button} ${styles.home}`}
                        onClick={goHome}
                    >
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FourOhFour;
