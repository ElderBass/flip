import React, { useState, useEffect } from 'react';
import { hasJoinedRoom } from '../../../utils/chatRoomUtils';
import ChatRoom from '../ChatRoom';
import ChatRoomActionButton from '../ChatRoomActionButton';
import RoomList from '../RoomList';
import styles from './ChatRoomContainer.module.css';

const ChatRoomContainer = ({ rooms, openRoom, username }) => {
    const [userInRoom, setUserInRoom] = useState(false);

    useEffect(() => {
        setUserInRoom(hasJoinedRoom(rooms, username));
    }, [rooms, username]);

    return (
        <>
            {userInRoom ? (
                <ChatRoom room={openRoom} />
            ) : (
                <RoomList rooms={rooms} username={username} />
            )}
            <div className={styles.spacer} />
            <div className={styles.moreActions}>
                <ChatRoomActionButton type={userInRoom ? 'reset' : 'create'} room={openRoom} />
            </div>
        </>
    );
};

export default ChatRoomContainer;
