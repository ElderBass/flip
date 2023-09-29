import React from 'react';
import styles from './CreateDeckButton.module.css';

const CreateDeckButton = ({ onClick }) => {
    return (
        <div onClick={onClick} className={styles.createDeckButton}>
            <div className={styles.header}>Create Deck</div>
        </div>
    );
};

export default CreateDeckButton;
