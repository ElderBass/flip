import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { initSocket, reconnect } from '../../../api/socket';
import Header from '../../common/Header/Header';
import ChatContainer from '../../common/ChatContainer';
import ChatRoomContainer from '../../common/ChatRoomContainer';
import ChatModal from '../../common/ChatModal';
import styles from './Chat.module.css';
import { unloadChat } from '../../../utils/unloadChat';

const Chat = () => {
    const { email, rooms, messages, openRoom, actionModal } = useSelector(({ user, chat }) => ({
        email: user.email,
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

        return () => unloadChat(openRoom);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.chatPage}>
            <Header />
            <div className={styles.chatPageContent}>
                {actionModal && actionModal.type ? (
                    <ChatModal type={actionModal.type} item={actionModal.item || null} />
                ) : (
                    <ChatRoomContainer rooms={rooms} openRoom={openRoom} email={email} />
                )}
                <ChatContainer messages={messages} room={openRoom} email={email} />
            </div>
        </div>
    );
};

export default Chat;
