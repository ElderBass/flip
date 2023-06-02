import React, { useState, useEffect } from 'react';
import styles from './ChatContainer.module.css';

const ChatContainer = ({ messages, room }) => {
    const { id, host } = room;

    const [conversation, setConversation] = useState([]);

    useEffect(() => {
        const roomMessages = messages.filter((msg) => msg.roomId === id);
        setConversation(roomMessages);
    }, [messages, id]);

    return (
        <div className={styles.chatContainer}>
            <div className={styles.header}>Chat Room: {id}</div>
            <ul className={styles.conversation}>
                {conversation.length > 0 &&
                    conversation.map((msg) => {
                        const msgClass = msg.sender === host ? styles.hostMsg : styles.userMsg;
                        const className = `${styles.msg} ${msgClass}`;

                        return (
                            <li className={className} key={msg.id}>
                                <p className={styles.sender}>{msg.sender}:</p>
                                <p className={styles.msgText}>{msg.text}</p>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default ChatContainer;
