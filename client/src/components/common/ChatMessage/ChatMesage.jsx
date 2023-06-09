import React from 'react';
import styles from './ChatMessage.module.css';

const ChatMessage = ({ isUserMessage, message }) => {
    const bubbleClass = isUserMessage ? styles.userBubble : '';
    const headerClass = isUserMessage ? styles.alignRight : '';

    return (
        <li className={styles.chatMessage}>
            {!isUserMessage && (
                <p className={`${styles.sender} ${headerClass}`}>{message.sender}</p>
            )}
            <div className={`${styles.messageBubble} ${bubbleClass}`}>
                <p className={styles.messageText}>{message.text}</p>
            </div>
        </li>
    );
};

export default ChatMessage;
