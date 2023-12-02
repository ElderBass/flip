import dayjs from 'dayjs';
import React from 'react';
import { SENDER_TYPE } from '../../../utils/constants';
import styles from './ChatMessage.module.css';

const ChatMessage = ({ message }) => {
    const { senderType, sender, text, timestamp } = message;
    const classNameMap = {
        thisUser: {
            bubble: styles.userBubble,
            header: '',
        },
        otherUser: {
            bubble: '',
            header: '',
        },
        system: {
            bubble: styles.systemBubble,
            header: styles.systemHeader,
        },
    };
    const { bubble, header } = classNameMap[senderType];

    const messageClasss =
        senderType === SENDER_TYPE.THIS_USER
            ? `${styles.chatMessage} ${styles.alignRight}`
            : styles.chatMessage;
    const isSystemMsg = senderType === SENDER_TYPE.SYSTEM;

    return (
        <div className={messageClasss}>
            {!isSystemMsg && <p className={`${styles.sender} ${header}`}>{sender || senderType}</p>}
            <div className={`${styles.messageBubble} ${bubble}`}>
                <p className={styles.messageText}>{text}</p>
            </div>
            <p className={styles.timestamp}>{dayjs(timestamp).format('h:mm a')}</p>
        </div>
    );
};

export default ChatMessage;
