import React from 'react';
import ChatRoomActionButton from '../ChatRoomActionButton';
import RoomListItem from '../RoomListItem';
import styles from './RoomList.module.css';

const RoomList = ({ rooms, email }) => {
    return (
        <div className={styles.roomListContent}>
            <h2 className={styles.flipWithFriends}>Flip with Friends</h2>
            <div className={styles.roomListContainer}>
                <div className={styles.header}>Join a Room</div>
                <div className={styles.roomList}>
                    {rooms.length ? (
                        rooms.map((room) => (
                            <RoomListItem key={room.id} room={room} email={email} />
                        ))
                    ) : (
                        <p>There are currently no chat rooms</p>
                    )}
                </div>
            </div>
            <ChatRoomActionButton type="create" />
        </div>
    );
};

export default RoomList;
