import React from 'react';
import styles from './StudyDeckHeader.module.css';

const StudyDeckHeader = ({ deckName, endOfDeck }) => {
    const heading = endOfDeck ? 'Finished Studying' : 'Studying';
    return (
        <div className={styles.studyDeckHeader}>
            <div className={styles.spacer} />
            <h3>
                {heading}{' '}
                <span className={styles.deckName}>
                    <i>{deckName}</i>
                </span>
            </h3>
        </div>
    );
};

export default StudyDeckHeader;
