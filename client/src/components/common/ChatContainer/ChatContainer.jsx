import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ChatContainer.module.css';
import { sendMessage, sendTyping } from '../../../api/socket';
import ChatHeader from '../ChatHeader';
import ChatMessage from '../ChatMessage';
import { trimEmail } from '../../../utils/helpers/emailHelpers';
import TypingIndicator from '../TypingIndicator/TypingIndicator';

const defaultScrollingOptions = {
    behavior: 'smooth',
    block: 'end',
    inline: 'center',
};

const ChatContainer = ({ messages, email }) => {
    const { openRoom } = useSelector((state) => state.chat);
    const newMessageRef = useRef(null);

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
            sendTyping(false);
            return;
        }

        sendTyping(true);
        setTimeout(() => sendTyping(false), 2000);
    };

    const scrollToMessage = (options) => {
        if (newMessageRef && newMessageRef.current) {
            setTimeout(() => {
                if (newMessageRef && newMessageRef.current) {
                    newMessageRef.current.scrollIntoView(options);
                }
            }, 1);
        }
    };

    // TODO: When I move rooms to the DB, will make messages as part of room
    // thus won't need this hack to filter out room-specific messages
    useEffect(() => {
        const roomMessages = messages.filter((msg) => msg.roomId === id);
        setConversation(roomMessages);
        scrollToMessage(defaultScrollingOptions);
    }, [messages, id]);

    return (
        <div className={styles.chatContainer}>
            <ChatHeader roomName={name} />
            <ul className={styles.conversation}>
                {conversation.length > 0 &&
                    conversation.map((msg) => (
                        <li key={msg.id} className={styles.chatMessageListItem} ref={newMessageRef}>
                            <ChatMessage
                                isUserMessage={msg.sender === trimEmail(email)}
                                message={msg}
                            />
                        </li>
                    ))}
            </ul>
            <TypingIndicator />
            <form className={styles.messageForm} onSubmit={onSubmit}>
                <div className={styles.actions}>
                    <textarea
                        rows={1}
                        className={styles.messageInput}
                        onChange={onChange}
                        id="message"
                        value={message}
                        placeholder="Type message here"
                        disabled={!openRoom.id}
                        onKeyDown={onKeyDown}
                    />
                    <button disabled={!openRoom.id || !message.length} className={styles.sendMsgBtn} type="submit">
                        <FontAwesomeIcon icon={faPaperPlane} size="2x" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatContainer;
