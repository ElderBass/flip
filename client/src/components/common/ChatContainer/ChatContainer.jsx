import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ChatContainer.module.css';
import { sendMessage, sendTyping } from '../../../api/socket';
import ChatHeader from '../ChatHeader';
import ChatMessage from '../ChatMessage';
import { trimEmail } from '../../../utils/helpers/emailHelpers';

const ChatContainer = ({ messages, email }) => {
    const openRoom = useSelector((state) => state.chat.openRoom);
    const userTyping = useSelector((state) => state.chat.userTyping);

    const { id, name } = openRoom;

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
        sendTyping(true);

        setTimeout(() => sendTyping(false), 1500);
    };

    // TODO: When I move rooms to the DB, will make messages as part of room
    // thus won't need this hack to filter out room-specific messages
    useEffect(() => {
        const roomMessages = messages.filter((msg) => msg.roomId === id);
        setConversation(roomMessages);
    }, [messages, id]);

    return (
        <div className={styles.chatContainer}>
            <ChatHeader roomName={name} />
            {userTyping && (
                <p className={styles.typingIndicator}>
                    <span className={styles.typer}>{userTyping.sender}</span> is typing...
                </p>
            )}
            <ul className={styles.conversation}>
                {conversation.length > 0 &&
                    conversation.map((msg) => (
                        <ChatMessage
                            key={msg.id}
                            isUserMessage={msg.sender === trimEmail(email)}
                            message={msg}
                        />
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
                        disabled={!openRoom.id}
                        onKeyDown={onKeyDown}
                    />
                    <button disabled={!openRoom.id} className={styles.sendMsgBtn} type="submit">
                        <FontAwesomeIcon icon={faPaperPlane} size="2x" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatContainer;
