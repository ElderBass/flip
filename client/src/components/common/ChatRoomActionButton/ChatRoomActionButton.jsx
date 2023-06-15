import React from 'react';
import store from '../../../store';
import * as ChatActions from '../../../store/actions/chat';
import { leaveRoom, resetServer } from '../../../api/socket';
import styles from './ChatRoomActionButton.module.css';

const ChatRoomActionButton = ({ type, roomId }) => {
    const Reset = () => {
        if (process.env.NODE_ENV === 'development') {
            return (
                <button
                    type="button"
                    className={`${styles.btn} ${styles.reset}`}
                    onClick={resetServer}
                >
                    Reset
                </button>
            );
        } else {
            return (
                <button
                    type="button"
                    className={`${styles.btn} ${styles.reset}`}
                    onClick={() => leaveRoom(roomId)}
                >
                    Leave Room
                </button>
            );
        }
    };

    const onActionClick = (type) => store.dispatch(ChatActions.setModal({ type }));

    const Create = () => (
        <button
            type="button"
            className={`${styles.btn} ${styles.create}`}
            onClick={() => onActionClick('Create')}
        >
            Create Chat Room
        </button>
    );

    const ActionButton = type === 'reset' ? Reset : Create;

    return <ActionButton />;
};

export default ChatRoomActionButton;
