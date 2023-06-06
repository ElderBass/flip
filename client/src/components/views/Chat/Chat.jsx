import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { initSocket, createRoom, resetServer, reconnect } from '../../../api/socket';
import Header from '../../common/Header/Header';
import RoomList from '../../common/RoomList';
import ChatContainer from '../../common/ChatContainer';
import styles from './Chat.module.css';
import { hasJoinedRoom } from '../../../utils/helpers/hasJoinedRoom';

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

    const userHasJoinedRoom = hasJoinedRoom(rooms, username);

    const ActionButton = () => {
        if (userHasJoinedRoom) {
            return (
                <button type="button" className={styles.chatBtn} onClick={resetServer}>
                    Reset
                </button>
            );
        } else {
            return (
                <button type="button" className={styles.chatBtn} onClick={createRoom}>
                    Create Chat Room
                </button>
            );
        }
    };

    return (
        <div className={styles.chatPage}>
            <Header />
            <div className={styles.chatPageContent}>
                <div className={styles.chat}>
                    <RoomList rooms={rooms} />
                    <div className={styles.spacer} />
                    <div className={styles.moreActions}>
                        <ActionButton />
                    </div>
                </div>
                <ChatContainer messages={messages} room={openRoom} />
            </div>
        </div>
    );
};

export default Chat;
