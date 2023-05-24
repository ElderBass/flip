import React from 'react';
import { initSocket, sendMessage } from '../../../api/socket';
import Actions from '../../common/Actions';
import Header from '../../common/Header/Header';
import styles from './Chat.module.css';

const Chat = () => {
    const onChatClick = async () => {
        await initSocket();
        sendMessage();
    };

    return (
        <div className={styles.chatPage}>
            <Header />
            <div className={styles.chatPageContent}>
                <div className={styles.chat}>
                    <button type="button" className={styles.chatBtn} onClick={onChatClick}>
                        Chat...?
                    </button>
                </div>
                <Actions />
            </div>
        </div>
    )
};

export default Chat;
