import React from 'react';
import styles from './DeleteDeckModal.module.css';

const DeleteDeckModal = ({ confirmDelete, cancel }) => {
    return (
        <div className={styles.deleteDeckModal}>
            <div className={styles.header}>
                <h3 className={`${styles.headerText} ${styles.large}`}>You really wanna delete this deck?</h3>
                <h5 className={`${styles.headerText} ${styles.medium}`}>This action cannot be undone</h5>
            </div>
            <div className={styles.actions}>
                <button className={`${styles.button} ${styles.cancel}`} onClick={cancel}>Cancel</button>
                <button className={`${styles.button} ${styles.confirm}`} onClick={confirmDelete}>Delete</button>
            </div>
        </div>
    )
};

export default DeleteDeckModal;
