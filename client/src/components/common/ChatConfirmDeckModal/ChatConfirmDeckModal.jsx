import React from 'react';
import { studyDeck } from '../../../api/socket';
import store from '../../../store';
import * as ChatActions from '../../../store/actions/chat';
import * as DeckActions from '../../../store/actions/decks';
import styles from './ChatConfirmDeckModal.module.css';

const ChatConfirmDeckModal = ({ deck }) => {
    const onCancelClick = () => {
        store.dispatch(ChatActions.setModal(null));
        store.dispatch(DeckActions.setSelectedDeck(null));
    };

    return (
        <div className={styles.chatConfirmDeckModal}>
            <div className={styles.header}>Start Flippin'</div>
            <div className={styles.heading}>
                <p className={styles.mainText}>
                    Confirm <span className={styles.deckName}>{deck.deckName}</span> is the deck you want
                </p>
                <p className={styles.subText}>See how you stack up with your friends</p>
            </div>
            <div className={styles.actions}>
                <button className={styles.cancel} type="button" onClick={onCancelClick}>
                    Cancel
                </button>
                <button className={styles.confirm} type="button" onClick={studyDeck}>
                    Study Deck
                </button>
            </div>
        </div>
    );
};

export default ChatConfirmDeckModal;
