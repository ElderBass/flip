import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { initSocket, reconnect } from '../../../api/socket';
import Header from '../../common/Header/Header';
import ChatContainer from '../../common/ChatContainer';
import styles from './Chat.module.css';
import { ChatModalMap } from '../../../utils/constants';
import ChatRoomContainer from '../../common/ChatRoomContainer';

const Chat = () => {
    const { username, rooms, messages, openRoom, actionModal } = useSelector(({ user, chat }) => ({
        username: user.username,
        rooms: chat.rooms,
        messages: chat.messages,
        openRoom: chat.openRoom,
        actionModal: chat.actionModal,
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

    const ModalComponent = actionModal?.type ? ChatModalMap[actionModal.type] : null;

    return (
        <div className={styles.chatPage}>
            <Header />
            <div className={styles.chatPageContent}>
                <div className={styles.chat}>
                    {actionModal && actionModal.type ? (
                        <ModalComponent type={actionModal.type} room={actionModal.room} />
                    ) : (
                        <ChatRoomContainer rooms={rooms} openRoom={openRoom} username={username} />
                    )}
                </div>

                <ChatContainer messages={messages} room={openRoom} username={username} />
            </div>
        </div>
    );
};

export default Chat;
