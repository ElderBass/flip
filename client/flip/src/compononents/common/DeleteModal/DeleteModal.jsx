import React from 'react';
import styles from './DeleteModal.module.css';

const DeleteModal = ({ type, deleteFunc, cancelFunc }) => {

    return (
        <div className={styles.deleteModal}>
            <div className={styles.header}>
                <h3 className={`${styles.headerText} ${styles.large}`}>You really wanna delete this {type}?</h3>
                <h5 className={`${styles.headerText} ${styles.medium}`}>This action cannot be undone</h5>
            </div>
            <div className={styles.actions}>
                <button className={`${styles.button} ${styles.cancel}`} onClick={cancelFunc}>Cancel</button>
                <button className={`${styles.button} ${styles.confirm}`} onClick={deleteFunc}>Delete</button>
            </div>
        </div>
    )
};

export default DeleteModal;
