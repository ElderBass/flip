import React from 'react';
import Header from '../../common/Header/Header';
import Actions from '../../common/Actions';
import styles from './Deck.module.css';
import SelectedDeck from '../../SelectedDeck';

const Deck = () => {
    return (
        <div className={styles.deckPage}>
            <Header />
            <div className={styles.deckContent}>
                <SelectedDeck />
                <Actions />
            </div>
        </div>
    );
};

export default Deck;
