import React from 'react';
import store from '../../../../store';
import { resetServer } from '../../../../api/socket';
import * as ChatActions from '../../../../store/actions/chat';
import styles from '../ConfirmDeck/ConfirmDeck.module.css';

const ResetChat = () => {
    const onCancelClick = () => {
        store.dispatch(ChatActions.setModal(null));
    };

    return (
        <div className={styles.modal}>
            <div className={styles.header}>MR. RESETTI</div>
            <div className={styles.heading}>
                <p className={styles.mainText}>U MAD BRO??</p>
            </div>
            <div className={styles.actions}>
                <button className={styles.cancel} type="button" onClick={onCancelClick}>
                    Cancel
                </button>
                <button className={styles.confirm} type="button" onClick={resetServer}>
                    DEWIT
                </button>
            </div>
        </div>
    );
};

export default ResetChat;
