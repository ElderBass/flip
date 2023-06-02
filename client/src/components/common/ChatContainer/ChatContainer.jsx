import React, { useState, useEffect } from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ChatContainer.module.css';

const ChatContainer = ({ messages, room, submitMessage }) => {
    const { id, host } = room;

    const [conversation, setConversation] = useState([]);
    const [message, setMessage] = useState('');

    const onChange = (e) => setMessage(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!message) return;
        submitMessage(message);
        setMessage('');
    };

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
            <form className={styles.messageForm} onSubmit={(e) => onSubmit(e)}>
                <div className={styles.actions}>
                    <input
                        className={styles.messageInput}
                        onChange={onChange}
                        id="message"
                        value={message}
                        placeholder="Type message here"
                        disabled={!room.id}
                    />
                    <button disabled={!room.id} className={styles.sendMsgBtn} type="submit">
                        <FontAwesomeIcon icon={faPaperPlane} size="2x" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatContainer;
