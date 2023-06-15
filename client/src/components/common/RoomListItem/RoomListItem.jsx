import React from 'react';
import { hasJoinedRoom } from '../../../utils/chatRoomUtils';
import styles from './RoomListItem.module.css';

const RoomListItem = ({ room, username, onClick }) => {
    const userHasJoinedRoom = hasJoinedRoom(room, username);

    const nameText = `Room: ${room.name}`;
    const joinText = userHasJoinedRoom ? 'Joined' : 'Click to Join';

    return (
        <button
            onClick={() => onClick(room)}
            className={styles.roomListItem}
            type="button"
            disabled={userHasJoinedRoom}
        >
            <p>{nameText}</p>
            <p>{joinText}</p>
        </button>
    );
};

export default RoomListItem;
