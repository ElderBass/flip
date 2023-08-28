import React from 'react';
import styles from './ChatHeader.module.css';

const ChatHeader = ({ roomName = '' }) => {
    const RoomNameText = () => {
        return (
            <p className={styles.chatRoomName}>
                {roomName ? (
                    <p>
                        In Room <span className={styles.roomNameSpan}>{roomName}</span>
                    </p>
                ) : (
                    <p>Create or Join a Room to Chat</p>
                )}
            </p>
        );
    };

    return (
        <div className={styles.header}>
            <p className={styles.chatRoomHeader}>Flip Chat</p>
            <RoomNameText />
        </div>
    );
};

export default ChatHeader;
