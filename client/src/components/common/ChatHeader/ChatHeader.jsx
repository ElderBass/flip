import React from 'react';
import styles from './ChatHeader.module.css';

const ChatHeader = ({ roomName = '' }) => {
    return (
        <div className={styles.header}>
            <p className={styles.chatRoomHeader}>
                Flip Chat
            </p>
            <p className={styles.chatRoomName}>{roomName ? `In Room "${roomName}"` : 'Create or Join a Room to Chat' }</p>
        </div>
    );
};

export default ChatHeader;
