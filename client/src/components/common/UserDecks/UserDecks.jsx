import React from 'react';
import styles from './UserDecks.module.css';

const UserDecks = ({ decks }) => {
    return (
        <div className={styles.decksContainer}>
            {decks.length ? null : (
                <div className={styles.noDecks}>
                    <h2 className={styles.noDecksMessage}>You have no decks, bro!</h2>
                </div>
            )}
        </div>
    );
};

export default UserDecks;
