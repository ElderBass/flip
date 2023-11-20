import dayjs from 'dayjs';
import React from 'react';
import styles from './ChatMessage.module.css';

const ChatMessage = ({ message }) => {
    const { senderType, sender, text, timestamp } = message;
    const classNameMap = {
        thisUser: {
            bubble: styles.userBubble,
            header: ''
        },
        otherUser: {
            bubble: '',
            header: styles.alignRight,
        },
        system: {
            bubble: styles.systemBubble,
            header: styles.systemHeader,
        },
    };
    const { bubble, header } = classNameMap[senderType];

    return (
        <li className={styles.chatMessage}>
            <p className={`${styles.sender} ${header}`}>{sender || senderType}</p>
            <div className={`${styles.messageBubble} ${bubble}`}>
                <p className={styles.messageText}>{text}</p>
            </div>
            <p className={styles.timestamp}>{dayjs(timestamp).format('h:mm a')}</p>
        </li>
    );
};

export default ChatMessage;
