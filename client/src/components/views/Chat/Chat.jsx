import React, { useState } from 'react';
import store from '../../../store';
import { v4 as uuidv4 } from 'uuid';
import { initSocket, sendMessage, createRoom, resetServer } from '../../../api/socket';
import Actions from '../../common/Actions';
import Header from '../../common/Header/Header';
import styles from './Chat.module.css';

const Chat = () => {
    const {
        user: { username },
    } = store.getState();
    const [rooms, setRooms] = useState([]);

    const onCreateRoomClick = async () => {
        const roomId = uuidv4();
        await initSocket();
        sendMessage('sup witcha boy');
        createRoom(roomId);
        const newRoom = {
            id: roomId,
            host: username,
        };

        setRooms((prevState) => [...prevState, newRoom]);
    };

    return (
        <div className={styles.chatPage}>
            <Header />
            <div className={styles.chatPageContent}>
                <div className={styles.chat}>
                    <button type="button" className={styles.chatBtn} onClick={onCreateRoomClick}>
                        Create Chat Room
                    </button>
                    <div className={styles.rooms}>
                        <h2>Rooms:</h2>
                        <ul className={styles.roomsList}>
                            {rooms.length ? (
                                rooms.map((room) => (
                                    <li key={room.id} className={styles.listItem}>
                                        Host: {room.host}
                                    </li>
                                ))
                            ) : (
                                <p>There are currently no chat rooms</p>
                            )}
                        </ul>
                    </div>
                    <button type="button" className={styles.chatBtn} onClick={() => resetServer()}>
                        Reset
                    </button>
                </div>
                <Actions />
            </div>
        </div>
    );
};

export default Chat;
