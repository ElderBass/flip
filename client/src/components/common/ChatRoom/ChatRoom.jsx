import React from 'react';
import UserResult from '../UserResult';
import userResultStyles from '../UserResult/ChatResult.module.css';
import styles from './ChatRoom.module.css';

const ChatRoom = ({ room }) => {
    const { name, members = [] } = room;

    const onDeckClick = () => {};

    return (
        <div className={styles.chatRoom}>
            <div className={styles.header}>
                Now Viewing Room: <span className={styles.roomName}>{name}</span>
            </div>
            <div className={styles.heading}>
                <p style={{ margin: '8px' }}>Choose a Deck to Study</p>
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
