import React from 'react';
import { Link } from 'react-router-dom';
import styles from './EndOfDeck.module.css';

const EndOfDeck = ({ onStudyAgain }) => {
    return (
        <div className={styles.endOfDeck}>
            <div className={styles.finished}>You've finished! Now what?</div>
            <div className={styles.studyActions}>
                <button
                    onClick={() => onStudyAgain(true)}
                    className={`${styles.actionButton} ${styles.studyEntire}`}
                >
                    Restart Entire Deck
                </button>
                <button
                    onClick={() => onStudyAgain(false)}
                    className={`${styles.actionButton} ${styles.studyUnknown}`}
                >
                    Study Unknown Cards
                </button>
            </div>
            <Link to="/home" className={`${styles.returnHome} link`}>
                Return Home
            </Link>
        </div>
    );
};

export default EndOfDeck;
