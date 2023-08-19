import React, { useEffect, useState } from 'react';
import store from '../../../store';
import * as ChatActions from '../../../store/actions/chat';
import ChatRoomSelectDeck from '../ChatRoomSelectDeck';
import ChatRoomStudyDeck from '../ChatRoomStudyDeck';
import { shuffleArray } from '../../../utils/helpers/shuffleArray';
import styles from './ChatRoom.module.css';

const ChatRoom = ({ room }) => {
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

    return (
        <div className={styles.chatRoom}>
            {showStudyRoom ? (
                <ChatRoomStudyDeck
                    cards={shuffleArray(room.activeDeck?.cards) || []}
                    deckName={room.activeDeck?.deckName}
                />
            ) : (
                <ChatRoomSelectDeck room={room} onSelectDeck={onSelectDeck} />
            )}
        </div>
    );
};

export default ChatRoom;
