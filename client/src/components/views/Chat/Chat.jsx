import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    initSocket,
    createRoom,
    resetServer,
    joinRoom,
    reconnect,
} from '../../../api/socket';
import Header from '../../common/Header/Header';
import ChatContainer from '../../common/ChatContainer';
import styles from './Chat.module.css';
import RoomListItem from '../../common/RoomListItem/RoomListItem';

const Chat = () => {
    const { username, rooms, messages, openRoom } = useSelector(({ user, chat }) => ({
        username: user.username,
        rooms: chat.rooms,
        messages: chat.messages,
        openRoom: chat.openRoom,
    }));

    useEffect(() => {
        const connectToSocket = async () => {
            if (openRoom && openRoom.id) {
                await reconnect(openRoom.id);
            } else {
                await initSocket();
            }
        };
        connectToSocket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const disableRoomClick = !!(
        openRoom.host === username || openRoom?.members?.includes(username)
    );

    return (
        <div className={styles.chatPage}>
            <Header />
            <div className={styles.chatPageContent}>
                <div className={styles.chat}>
                    <button type="button" className={styles.chatBtn} onClick={createRoom}>
                        Create Chat Room
                    </button>
                    <div className={styles.rooms}>
                        <h2>Rooms:</h2>
                        <ul className={styles.roomsList}>
                            {rooms.length ? (
                                rooms.map((room) => (
                                    <RoomListItem
                                        key={room.id}
                                        room={room}
                                        onClick={() => joinRoom(room)}
                                        disabled={disableRoomClick}
                                    />
                                ))
                            ) : (
                                <p>There are currently no chat rooms</p>
                            )}
                        </ul>
                    </div>
                    <div className={styles.moreActions}>
                        <button
                            type="button"
                            className={styles.chatBtn}
                            onClick={() => resetServer()}
                        >
                            Reset
                        </button>
                    </div>
                </div>
                <ChatContainer messages={messages} room={openRoom} />
            </div>
        </div>
    );
};

export default Chat;
