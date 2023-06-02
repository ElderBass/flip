import React, { useState, useEffect } from 'react';
import store from '../../../store';
import { v4 as uuidv4 } from 'uuid';
import {
    initSocket,
    sendMessage,
    createRoom,
    resetServer,
    joinRoom,
    disconnectSocket,
} from '../../../api/socket';
import Header from '../../common/Header/Header';
import ChatContainer from '../../common/ChatContainer';
import styles from './Chat.module.css';
import RoomListItem from '../../common/RoomListItem/RoomListItem';

const Chat = () => {
    const {
        user: { username },
        chat: { rooms, messages, openRoom = {} },
    } = store.getState();

    const [currentRoom, setCurrentRoom] = useState(openRoom);
    const [allRooms, setAllRooms] = useState([]);
    const [currentMessages, setCurrentMessages] = useState([]);

    useEffect(() => {
        const connectToSocket = async () => {
            await initSocket();
        };
        connectToSocket();

        return () => disconnectSocket();
    }, []);

    useEffect(() => {
        setCurrentMessages((prevState) => [...prevState, ...messages]);

        return () => setCurrentMessages([]);
    }, [messages]);

    useEffect(() => {
        setAllRooms((prevState) => [...prevState, ...rooms]);

        return () => setAllRooms([]);
    }, [rooms]);

    const onCreateRoomClick = async () => {
        await initSocket();

        const roomId = uuidv4();
        const newRoom = {
            id: roomId,
            host: username,
            members: [],
        };
        await createRoom(newRoom);
        setCurrentRoom(newRoom);
        setAllRooms((prevState) => [...prevState, newRoom]);
    };

    const onSendMessage = (message) => {
        const messageObject = {
            text: message,
            id: `message-${uuidv4()}`,
            roomId: currentRoom.id,
            sender: username,
        };
        sendMessage(messageObject);
        setCurrentMessages((prevState) => [...prevState, messageObject]);
    };

    const onRoomItemClick = (room) => {
        room.members.push(username);
        joinRoom(room);
        setCurrentRoom(room);
    };

    const disableRoomClick = !!(currentRoom.host === username || currentRoom?.members?.includes(username));

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
                            {allRooms.length ? (
                                allRooms.map((room) => (
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
                <ChatContainer
                    messages={currentMessages}
                    room={currentRoom}
                    submitMessage={onSendMessage}
                />
            </div>
        </div>
    );
};

export default Chat;
