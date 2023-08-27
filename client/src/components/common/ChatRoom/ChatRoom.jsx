import React, { useEffect, useState } from 'react';
import store from '../../../store';
import * as ChatActions from '../../../store/actions/chat';
import ChatRoomSelectDeck from '../ChatRoomSelectDeck';
import ChatRoomStudyDeck from '../ChatRoomStudyDeck';
import styles from './ChatRoom.module.css';

const ChatRoom = ({ room }) => {
    const {
        user: { email },
    } = store.getState();

    const [showStudyRoom, setShowStudyRoom] = useState(false);

    useEffect(() => {
        if (room.activeDeck) {
            setShowStudyRoom(true);
        } else {
            setShowStudyRoom(false);
        }
    }, [room]);

    const onSelectDeck = (deck) => {
        store.dispatch(ChatActions.setModal({ type: 'Study', deck }));
    };

    const userIsHost = room && room.host && email === room.host.email;

    return (
        <div className={styles.chatRoom}>
            {showStudyRoom ? (
                <ChatRoomStudyDeck deck={room.activeDeck} userIsHost={userIsHost} />
            ) : (
                <ChatRoomSelectDeck room={room} onSelectDeck={onSelectDeck} />
            )}
        </div>
    );
};

export default ChatRoom;
