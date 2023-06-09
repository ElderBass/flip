import React from 'react';
import { createRoom, resetServer } from '../../../api/socket';
import styles from './ChatRoomActionButton.module.css';

const ChatRoomActionButton = ({ type }) => {
    const Reset = () => (
        <button type="button" className={`${styles.btn} ${styles.reset}`} onClick={resetServer}>
            Reset
        </button>
    );

    const Create = () => (
        <button type="button" className={`${styles.btn} ${styles.create}`} onClick={createRoom}>
            Create Chat Room
        </button>
    );

    const ActionButton = type === 'reset' ? Reset : Create;

    return <ActionButton />
};

export default ChatRoomActionButton;
