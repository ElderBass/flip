import React from 'react';
import Header from '../../common/Header/Header';
import styles from './CreateDeck.module.css';
import CreateDeckContent from '../../common/CreateDeckContent';

const CreateDeck = () => {
    return (
        <div className={styles.createDeckPage}>
            <Header />
            <CreateDeckContent />
        </div>
    );
};

export default CreateDeck;
