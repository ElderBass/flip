import React from 'react';
import Header from '../../common/Header/Header';
import Actions from '../../common/Actions';
import SelectedDeck from '../../common/SelectedDeck';
import styles from './Deck.module.css';

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
