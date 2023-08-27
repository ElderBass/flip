import React from 'react';
import store from '../../../store';
import * as ChatActions from '../../../store/actions/chat';
import { hasJoinedRoom } from '../../../utils/chatRoomUtils';
import { MODALS } from '../../../utils/constants';
import { trimEmail } from '../../../utils/helpers/emailHelpers';
import styles from './RoomListItem.module.css';

const RoomListItem = ({ room, email }) => {
    const userHasJoinedRoom = hasJoinedRoom(room, email);

    const { members, name, host } = room;

    const onClick = () => {
        store.dispatch(ChatActions.setModal({ type: MODALS.JOIN, room }));
    };

    const nameText = `Room: ${name}`;
    const joinText = userHasJoinedRoom ? 'Joined' : 'Click to Join';

    return (
        <button
            onClick={onClick}
            className={styles.roomListItem}
            type="button"
            disabled={userHasJoinedRoom}
        >
            <p>{nameText}</p>
            <p>Host: {trimEmail(host.email)}</p>
            <p>Joined: {members.length}</p>
            <p>{joinText}</p>
        </button>
    );
};

export default RoomListItem;
