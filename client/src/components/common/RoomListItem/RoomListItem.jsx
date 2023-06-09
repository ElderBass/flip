import React from 'react';
import { hasJoinedRoom } from '../../../utils/helpers/hasJoinedRoom';
import styles from './RoomListItem.module.css';

const RoomListItem = ({ room, username, onClick }) => {
    const userHasJoinedRoom = hasJoinedRoom(room, username);

    const hostText = `Host: ${room.host}`;
    const joinText = userHasJoinedRoom ? 'Joined' : 'Click to Join';

    return (
        <button
            onClick={() => onClick(room)}
            className={styles.roomListItem}
            type="button"
            disabled={userHasJoinedRoom}
        >
            <p>{hostText}</p>
            <p>{joinText}</p>
        </button>
    );
};

export default RoomListItem;
