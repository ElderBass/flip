import React from 'react';
import store from '../../../../store';
import * as ChatActions from '../../../../store/actions/chat';
import { destroyRoom, joinRoom, leaveRoom } from '../../../../api/socket';
import styles from './RoomAction.module.css';

const RoomAction = ({ item: room, type }) => {
    const textMap = {
        Leave: {
            main: 'Had enough chatter?',
            sub: 'You can always join again if you change your mind',
        },
        Join: {
            main: 'Feeling social?',
            sub: 'Join up to flip some cards while chatting with friends',
        },
        End: {
            main: 'Need a break?',
            sub: 'This cannot be undone, but you can create another room any time'
        }
    };

    const onConfirmClickMap = {
        Leave: leaveRoom,
        Join: joinRoom,
        End: destroyRoom
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

export default RoomAction;
