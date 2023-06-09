import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { initSocket, reconnect } from '../../../api/socket';
import Header from '../../common/Header/Header';
import RoomList from '../../common/RoomList';
import ChatContainer from '../../common/ChatContainer';
import styles from './Chat.module.css';
import { hasJoinedRoom } from '../../../utils/helpers/hasJoinedRoom';
import ChatRoomActionButton from '../../common/ChatRoomActionButton';

const Chat = () => {
    const { username, rooms, messages, openRoom } = useSelector(({ user, chat }) => ({
        username: user.username,
        rooms: chat.rooms,
        messages: chat.messages,
        openRoom: chat.openRoom,
    }));

    const [actionButtonType, setActionButtonType] = useState('create');

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

    useEffect(() => {
        const actionType = hasJoinedRoom(rooms, username) ? 'reset' : 'create';
        setActionButtonType(actionType);

    }, [rooms, username]);


    return (
        <div className={styles.chatPage}>
            <Header />
            <div className={styles.chatPageContent}>
                <div className={styles.chat}>
                    <RoomList rooms={rooms} username={username} />
                    <div className={styles.spacer} />
                    <div className={styles.moreActions}>
                        <ChatRoomActionButton type={actionButtonType} />
                    </div>
                </div>
                <ChatContainer messages={messages} room={openRoom} />
            </div>
        </div>
    );
};

export default Chat;
