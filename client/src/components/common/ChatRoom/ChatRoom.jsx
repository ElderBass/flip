import React, { useEffect, useState } from 'react';
import store from '../../../store';
import * as ChatActions from '../../../store/actions/chat';
import ChatRoomSelectDeck from '../ChatRoomSelectDeck';
import ChatRoomStudyDeck from '../ChatRoomStudyDeck';
import styles from './ChatRoom.module.css';

const ChatRoom = ({ room }) => {
    const [showStudyRoom, setShowStudyRoom] = useState(false);

    useEffect(() => {
        if (room.activeDeck) {
            setShowStudyRoom(true);
        }
    }, [room]);

    const onSelectDeck = (deck) => {
        store.dispatch(ChatActions.setModal({ type: 'Study', deck }));
    };

    return (
        <div className={styles.chatRoom}>
            {showStudyRoom ? (
                <ChatRoomStudyDeck />
            ): (
                <ChatRoomSelectDeck room={room} onSelectDeck={onSelectDeck} />
            )}
        </div>
    );
};

export default ChatRoom;
