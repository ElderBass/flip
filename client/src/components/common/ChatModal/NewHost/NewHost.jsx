import React from 'react';
import store from '../../../../store';
import * as ChatActions from '../../../../store/actions/chat';
import * as ChatStudyDeckActions from '../../../../store/actions/chatStudyDeck';
import { trimEmail } from '../../../../utils/helpers/emailHelpers';
import styles from './NewHost.module.css';

const NewHost = ({ item: room }) => {
    const {
        host: { email: hostEmail },
    } = room;

    const {
        user: { email: userEmail },
    } = store.getState();

    const userIsHost = hostEmail === userEmail;

    const hostName = userIsHost ? 'You' : trimEmail(hostEmail);
    const verb = userIsHost ? 'are' : 'is'

    const onOkayClick = () => {
        store.dispatch(ChatActions.setOpenRoom(room));
        store.dispatch(ChatStudyDeckActions.reset());
        store.dispatch(ChatActions.setModal(null));
    };

    return (
        <div className={styles.chatNewHostModal}>
            <div className={styles.header}>The Host has Flipped</div>
            <div className={styles.heading}>
                <p className={styles.headingText}>The previous host has left this room.</p>
                <p className={styles.secondaryText}>
                    <span className={styles.hostName}>{hostName}</span> {verb} the new host.
                </p>
            </div>
            <div className={styles.actions}>
                <button
                    className={`${styles.btn} ${styles.backToChatBtn}`}
                    onClick={onOkayClick}
                >
                    Okay
                </button>
            </div>
        </div>
    );
};

export default NewHost;
