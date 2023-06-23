import React, { useState, useEffect } from 'react';
import { hasJoinedRoom } from '../../../utils/chatRoomUtils';
import ChatRoom from '../ChatRoom';
import ChatRoomActionButton from '../ChatRoomActionButton';
import RoomList from '../RoomList';
import styles from './ChatRoomContainer.module.css';

const ChatRoomContainer = ({ rooms, openRoom, email }) => {
    const [userInRoom, setUserInRoom] = useState(false);

    useEffect(() => {
        setUserInRoom(hasJoinedRoom(rooms, email));
    }, [rooms, email]);

    return (
        <>
            {userInRoom ? <ChatRoom room={openRoom} /> : <RoomList rooms={rooms} email={email} />}
            <div className={styles.spacer} />
            <div className={styles.moreActions}>
                <ChatRoomActionButton type={userInRoom ? 'reset' : 'create'} room={openRoom} />
            </div>
        </>
    );
};

export default ChatRoomContainer;
