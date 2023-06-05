import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
    initSocket,
    sendMessage,
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

    const onCreateRoomClick = () => {
        const roomId = uuidv4();
        const newRoom = {
            id: roomId,
            host: username,
            members: [],
        };
        createRoom(newRoom);
    };

    const onSendMessage = (message) => {
        const messageObject = {
            text: message,
            id: `message-${uuidv4()}`,
            roomId: openRoom.id,
            sender: username,
        };
        sendMessage(messageObject);
    };

    const onRoomItemClick = (room) => {
        const updatedRoom = {
            ...room,
            members: [...room.members, username],
        };
        joinRoom(updatedRoom);
    };

    const disableRoomClick = !!(
        openRoom.host === username || openRoom?.members?.includes(username)
    );

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
                                    <RoomListItem
                                        key={room.id}
                                        room={room}
                                        onClick={onRoomItemClick}
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
                <ChatContainer messages={messages} room={openRoom} submitMessage={onSendMessage} />
            </div>
        </div>
    );
};

export default Chat;
