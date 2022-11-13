import React from 'react';
import store from '../../store';
import styles from './SelectedDeck.module.css';

const SelectedDeck = () => {
    const {
        decks: { selectedDeck },
    } = store.getState();
    const { deckName, cards, timestamp } = selectedDeck;

    const dateCreated = new Date(timestamp).toLocaleDateString();
    console.log('\n\n dateCreated ? ', dateCreated, '\n\n');

    return (
        <div className={styles.selectedDeckContainer}>
            <div className={styles.selectedDeck}>
                <div className={styles.greyLines}>
                    <hr className={styles.greyLine} />
                    <hr className={styles.greyLine} />
                    <hr className={styles.greyLine} />
                    <hr className={styles.greyLine} />
                    <hr className={styles.greyLine} />
                </div>
                <div className={styles.header}>{deckName}</div>
                <div className={styles.deckStats}>
                    <div className={styles.statWrap}>
                        <p className={styles.statLabel}>Number of Cards:</p>
                        <p className={styles.stat}>{cards.length}</p>
                    </div>
                    <div className={styles.statWrap}>
                        <p className={styles.statLabel}>Date Created:</p>
                        <p className={styles.stat}>{dateCreated}</p>
                    </div>
                </div>
                <div className={styles.actions}>
                    <button className={`${styles.button} ${styles.editBtn}`}>Edit</button>
                    <button className={`${styles.button} ${styles.studyBtn}`}>Study</button>
                </div>
            </div>
        </div>
    );
};

export default SelectedDeck;
