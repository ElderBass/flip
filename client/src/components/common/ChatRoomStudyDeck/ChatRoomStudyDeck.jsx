import React, { useState, useEffect } from 'react';
import store from '../../../store';
import ReactCardFlip from 'react-card-flip';
import { incrementIndexDelayMillis, SIDES } from '../../../utils/constants';
import * as ChatStudyDeckActions from '../../../store/actions/chatStudyDeck';
import StudyCardSide from '../StudyCardSide';
import StudyDeckHeader from '../StudyDeckHeader/StudyDeckHeader';
import styles from './ChatRoomStudyDeck.module.css';
import { endStudyDeck, incrementStudyDeck } from '../../../api/socket';

const ChatRoomStudyDeck = ({ userIsHost }) => {
    const {
        chat: {
            openRoom: { id: roomId },
        },
        chatStudyDeck,
    } = store.getState();

    const { cards, deckName, index, flipped, reachedEndOfDeck } = chatStudyDeck;

    const cardSideDurationMillis = 5000;

    const [showNextButton, setShowNextButton] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            store.dispatch(ChatStudyDeckActions.setFlipped(true));
            setShowNextButton(true);
        }, cardSideDurationMillis);
    }, [index]);

    if (!chatStudyDeck._id) return null;

    const onNextClick = () => {
        const nextIndex = index + 1;
        setShowNextButton(false);
        store.dispatch(ChatStudyDeckActions.setFlipped(false));
        setTimeout(() => {
            if (nextIndex === cards.length) {
                store.dispatch(ChatStudyDeckActions.setReachedEndOfDeck(true));
                endStudyDeck(roomId);
            } else {
                store.dispatch(ChatStudyDeckActions.setIndex(nextIndex));
                incrementStudyDeck(roomId, nextIndex);
            }
        }, incrementIndexDelayMillis);
    };

    return (
        <div className={styles.chatRoomStudyDeck}>
            <StudyDeckHeader deckName={deckName} />
            {!reachedEndOfDeck ? (
                <div className={styles.gameWrapper}>
                    <ReactCardFlip isFlipped={flipped}>
                        <StudyCardSide
                            value={cards[index]?.front || ''}
                            side={SIDES.FRONT}
                            flipWithFriends={true}
                        />
                        <StudyCardSide
                            value={cards[index]?.back || ''}
                            side={SIDES.BACK}
                            flipWithFriends={true}
                        />
                    </ReactCardFlip>
                    {showNextButton && userIsHost && (
                        <button className={styles.nextBtn} onClick={onNextClick}>
                            Next
                        </button>
                    )}
                </div>
            ) : (
                <div>This is the end homie</div>
            )}
        </div>
    );
};

export default ChatRoomStudyDeck;
