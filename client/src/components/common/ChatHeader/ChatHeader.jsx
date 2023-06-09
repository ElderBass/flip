import React from 'react';
import styles from './ChatHeader.module.css';

const ChatHeader = ({ roomId = '' }) => {
    return (
        <div className={styles.header}>
            <p className={styles.chatRoomHeader}>
                Flip Chat
            </p>
            <p className={styles.chatRoomName}>{roomId ? roomId : 'Create or Join a Room to Chat' }</p>
        </div>
    );
};

export default ChatHeader;
