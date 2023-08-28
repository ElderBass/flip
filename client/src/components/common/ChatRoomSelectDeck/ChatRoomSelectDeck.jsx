import React from 'react';
import store from '../../../store';
import UserResult from '../UserResult';
import userResultStyles from '../UserResult/ChatResult.module.css';
import styles from './ChatRoomSelectDeck.module.css';

const ChatRoomSelectDeck = ({ room, onSelectDeck }) => {
    const { name, members, host = '' } = room;
    const {
        user: { email },
    } = store.getState();

    const userIsHost = email === host?.email;

    const headingText = userIsHost ? 'Choose a Deck to Study' : 'Host is choosing a deck';

    return (
        <div className={styles.chatRoomSelectDeck}>
            <div className={styles.header}>
                Now Viewing Room: <span className={styles.roomName}>{name}</span>
            </div>
            <div className={styles.heading}>
                <p className={styles.headingText}>{headingText}</p>
            </div>
            {userIsHost ? (
                <div className={styles.users}>
                    {members.length > 0 &&
                        members.map((member, i) => (
                            <UserResult
                                key={i}
                                user={member}
                                onDeckClick={onSelectDeck}
                                styles={userResultStyles}
                            />
                        ))}
                </div>
            ) : (
                <div className={styles.waitingMessage}>
                    <p className={styles.waitingText}>
                        Please wait while the host chooses a deck to study
                    </p>
                    <p className={styles.waitingText}>
                        In the meantime, feel free to blow up the chat!
                    </p>
                </div>
            )}
        </div>
    );
};

export default ChatRoomSelectDeck;
