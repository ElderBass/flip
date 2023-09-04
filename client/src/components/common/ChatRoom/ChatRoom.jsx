import React, { useEffect, useState } from 'react';
import store from '../../../store';
import * as ChatActions from '../../../store/actions/chat';
import { MODALS } from '../../../utils/constants';
import ChatRoomSelectDeck from '../ChatRoomSelectDeck';
import ChatRoomStudyDeck from '../ChatRoomStudyDeck';
import styles from './ChatRoom.module.css';

const ChatRoom = ({ room }) => {
    const {
        user: { email },
        chatStudyDeck, 
        chat: { openRoom: { id } }
    } = store.getState();

    const [showStudyRoom, setShowStudyRoom] = useState(false);

    useEffect(() => {
        if (chatStudyDeck._id) {
            setShowStudyRoom(true);
        } else {
            setShowStudyRoom(false);
        }
    }, [chatStudyDeck]);

    const onSelectDeck = (deck) => {
        store.dispatch(ChatActions.setModal({ type: MODALS.STUDY, item: deck }));
    };

    const userIsHost = room && room.host && email === room.host.email;

    return (
        <div className={styles.chatRoom}>
            {showStudyRoom ? (
                <ChatRoomStudyDeck deck={chatStudyDeck} roomId={id} userIsHost={userIsHost} />
            ) : (
                <ChatRoomSelectDeck room={room} onSelectDeck={onSelectDeck} />
            )}
        </div>
    );
};

export default ChatRoom;
