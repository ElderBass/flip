import React from 'react';
import { trimEmail } from '../../../utils/helpers/emailHelpers';
import UserResult from '../UserResult';
import userResultStyles from '../UserResult/ChatResult.module.css';
import styles from './ChatRoom.module.css';

const ChatRoom = ({ room }) => {
    const { name, members = [] } = room;

    const membersString = members.map((member) => trimEmail(member.email)).join(', ');

    const onDeckClick = () => {};

    return (
        <div className={styles.chatRoom}>
            <div className={styles.header}>
                Now Viewing Room: <span className={styles.roomName}>{name}</span>
            </div>
            <div className={styles.roomDeets}>
                <p className={styles.currentMembers}>Current Members:</p>
                <p className={styles.memberString}>{membersString}</p>
            </div>
            <div className={styles.users}>
                {members.length > 0 &&
                    members.map((member) => (
                        <UserResult
                            key={member._id}
                            user={member}
                            onDeckClick={onDeckClick}
                            styles={userResultStyles}
                        />
                    ))}
            </div>
        </div>
    );
};

export default ChatRoom;
