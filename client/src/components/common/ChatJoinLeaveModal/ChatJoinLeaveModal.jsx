import React from 'react';
import store from '../../../store';
import * as ChatActions from '../../../store/actions/chat';
import { joinRoom, leaveRoom } from '../../../api/socket';
import styles from './ChatJoinLeaveModal.module.css';

const ChatJoinLeaveModal = ({ room, type }) => {
    const textMap = {
        Leave: {
            main: 'Had enough chatter?',
            sub: 'You can always join again if you change your mind',
        },
        Join: {
            main: 'Feeling social?',
            sub: 'Join up to flip some cards while chatting with friends',
        },
    };

    const onConfirmClickMap = {
        Leave: leaveRoom,
        Join: joinRoom,
    };

    const onConfirm = () => onConfirmClickMap[type](room);

    const onCancelClick = () => {
        store.dispatch(ChatActions.setModal(null));
    };

    return (
        <div className={styles.roomActionModal}>
            <div className={styles.header}>{`${type} Room`}</div>
            <div className={styles.heading}>
                <p className={styles.mainText}>{textMap[type].main}</p>
                <p className={styles.subText}>{textMap[type].sub}</p>
            </div>
            <div className={styles.actions}>
                <button className={styles.cancel} type="button" onClick={onCancelClick}>
                    Cancel
                </button>
                <button className={styles.confirm} type="button" onClick={onConfirm}>
                    {`${type} Room`}
                </button>
            </div>
        </div>
    );
};

export default ChatJoinLeaveModal;
