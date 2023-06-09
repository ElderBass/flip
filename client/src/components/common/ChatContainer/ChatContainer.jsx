import React, { useState, useEffect } from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ChatContainer.module.css';
import { sendMessage } from '../../../api/socket';
import ChatHeader from '../ChatHeader';
import ChatMessage from '../ChatMessage';

const ChatContainer = ({ messages, room, username }) => {
    const { id } = room;

    const [conversation, setConversation] = useState([]);
    const [message, setMessage] = useState('');

    const onChange = (e) => setMessage(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!message) return;
        sendMessage(message);
        setMessage('');
    };

    const onKeyDown = (e) => {
        const isEnterKey = e.code === 'Enter' || e.keyCode === 13;
        if (isEnterKey && e.shiftKey === false) {
            onSubmit(e);
        }
    };

    useEffect(() => {
        const roomMessages = messages.filter((msg) => msg.roomId === id);
        setConversation(roomMessages);
    }, [messages, id]);

    return (
        <div className={styles.chatContainer}>
            <ChatHeader roomId={id} />
            <ul className={styles.conversation}>
                {conversation.length > 0 &&
                    conversation.map((msg) => (
                        <ChatMessage isUserMessage={msg.sender === username} message={msg} />
                    ))}
            </ul>
            <form className={styles.messageForm} onSubmit={onSubmit}>
                <div className={styles.actions}>
                    <input
                        className={styles.messageInput}
                        onChange={onChange}
                        id="message"
                        value={message}
                        placeholder="Type message here"
                        disabled={!room.id}
                        onKeyDown={onKeyDown}
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
