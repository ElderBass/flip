import React from 'react';
import styles from './ChatRoom.module.css';

const ChatRoom = ({ room }) => {
    const { name, members = [] } = room;
    const membersString = members.join(', ');
    return (
        <div className={styles.chatRoom}>
            <div className={styles.header}>
                Now Viewing Room: <span className={styles.roomName}>{name}</span>
            </div>
            <div className={styles.roomDeets}>
                <p className={styles.currentMembers}>Current Members:</p>
                <p>{membersString}</p>
            </div>
        </div>
    );
};

export default ChatRoom;
