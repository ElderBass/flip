import React from 'react';
import { useHistory } from 'react-router-dom';
import store from '../../../store';
import * as ChatActions from '../../../store/actions/chat';
import styles from './ChatRoomEndedModal.module.css';

const ChatRoomEndedModal = ({ room }) => {
    const history = useHistory();

    const onHomeClick = () => {
        store.dispatch(ChatActions.reset());
        history.push('/home');
    };

    const onBackToChatClick = () => {
        store.dispatch(ChatActions.endChat());
    };

    return (
        <div className={styles.chatRoomEndedModal}>
            <div className={styles.header}>All flipped out</div>
            <div className={styles.heading}>
                <p className={styles.headingText}>
                    The chat room <span className={styles.roomName}>"{room.name}"</span> was ended
                    by the host
                </p>
                <p className={styles.secondaryText}>Join or create another chat, or head home</p>
            </div>
            <div className={styles.actions}>
                <button className={`${styles.btn} ${styles.goHomeBtn}`} onClick={onHomeClick}>
                    Go Home
                </button>
                <button
                    className={`${styles.btn} ${styles.backToChatBtn}`}
                    onClick={onBackToChatClick}
                >
                    Back to Chat
                </button>
            </div>
        </div>
    );
};

export default ChatRoomEndedModal;
