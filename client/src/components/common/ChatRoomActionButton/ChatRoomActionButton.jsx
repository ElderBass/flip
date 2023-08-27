import React from 'react';
import store from '../../../store';
import * as ChatActions from '../../../store/actions/chat';
import styles from './ChatRoomActionButton.module.css';

const ChatRoomActionButton = ({ type, room }) => {
    const onActionClick = (type) => {
        console.log('\n ARE WE FUCKING DOING THIS \n\n');
        store.dispatch(ChatActions.setModal({ type, room }));
    };

    const Reset = () => {
        return (
            <>
                {process.env.NODE_ENV === 'development' && (
                    <button
                        type="button"
                        className={`${styles.btn} ${styles.reset}`}
                        onClick={() => onActionClick('Reset')}
                    >
                        Reset
                    </button>
                )}
                <button
                    type="button"
                    className={`${styles.btn} ${styles.reset}`}
                    onClick={() => onActionClick('Leave')}
                >
                    Leave Room
                </button>
            </>
        );
    };

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
