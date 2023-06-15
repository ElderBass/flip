import React from 'react';
import store from '../../../store';
import * as ChatActions from '../../../store/actions/chat';
import { hasJoinedRoom } from '../../../utils/chatRoomUtils';
import styles from './RoomListItem.module.css';

const RoomListItem = ({ room, username }) => {
    const userHasJoinedRoom = hasJoinedRoom(room, username);

    const onClick = () => {
        store.dispatch(ChatActions.setModal({ type: 'Join', room }));
    };

    const nameText = `Room: ${room.name}`;
    const joinText = userHasJoinedRoom ? 'Joined' : 'Click to Join';

    return (
        <button
            onClick={onClick}
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
