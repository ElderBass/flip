import React from 'react';
import RoomListItem from '../RoomListItem/RoomListItem';
import styles from './RoomList.module.css';

const RoomList = ({ rooms, username }) => {
    return (
        <div className={styles.roomListContainer}>
            <div className={styles.header}>
                Join a Room
            </div>
            <div className={styles.roomList}>
                {rooms.length ? (
                    rooms.map((room) => (
                        <RoomListItem
                            key={room.id}
                            room={room}
                            username={username}
                        />
                    ))
                ) : (
                    <p>There are currently no chat rooms</p>
                )}
            </div>
        </div>
    );
};

export default RoomList;
