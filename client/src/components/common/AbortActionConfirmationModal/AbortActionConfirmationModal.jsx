import React from 'react';
import styles from './AbortActionConfirmationModal.module.css';

const AbortActionConfirmationModal = ({ message, deleteFunc, cancelFunc, btnWording= "Delete" }) => {

    return (
        <div className={styles.confirmationModal}>
            <div className={styles.header}>
                <h3 className={`${styles.headerText} ${styles.large}`}>{message}</h3>
                <h5 className={`${styles.headerText} ${styles.medium}`}>This action cannot be undone</h5>
            </div>
            <div className={styles.actions}>
                <button className={`${styles.button} ${styles.cancel}`} onClick={cancelFunc}>Go Back</button>
                <button className={`${styles.button} ${styles.confirm}`} onClick={deleteFunc}>{btnWording}</button>
            </div>
        </div>
    )
};

export default AbortActionConfirmationModal;
