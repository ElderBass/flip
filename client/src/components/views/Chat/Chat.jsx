import React, { useState, useEffect } from 'react';
import store from '../../../store';
import { v4 as uuidv4 } from 'uuid';
import {
    initSocket,
    sendMessage,
    createRoom,
    resetServer,
    getRooms,
    joinRoom,
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

    const [message, setMessage] = useState('');
    const [currentRoom, setCurrentRoom] = useState(openRoom);
    const [currentMessages, setCurrentMessages] = useState(messages);

    useEffect(() => {
        const getAvailableRooms = async () => {
            await getRooms();
        };
        getAvailableRooms();
    }, []);

    useEffect(() => {
        setCurrentMessages(messages);
    }, [messages]);

    const onCreateRoomClick = async () => {
        await initSocket();

        const roomId = uuidv4();
        const newRoom = {
            id: roomId,
            host: username,
        };
        await createRoom(newRoom);
        setCurrentRoom(newRoom);
    };

    const onSendMessage = () => {
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
        joinRoom(room);
        setCurrentRoom(room);
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
                        <input
                            onChange={(e) => setMessage(e.target.value)}
                            id="message"
                            value={message}
                            placeholder="Type message here"
                        />
                        <button className={styles.chatBtn} type="button" onClick={onSendMessage}>
                            Send Message
                        </button>
                        <h2>Rooms:</h2>
                        <ul className={styles.roomsList}>
                            {rooms.length ? (
                                rooms.map((room) => (
                                    <RoomListItem
                                        key={room.id}
                                        room={room}
                                        onClick={onRoomItemClick}
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
                        <button type="button" className={styles.chatBtn} onClick={() => getRooms()}>
                            Get Rooms
                        </button>
                    </div>
                </div>
                <ChatContainer messages={currentMessages} room={currentRoom} />
            </div>
        </div>
    );
};

export default Chat;
