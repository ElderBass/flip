import React, { useState, useEffect } from 'react';
import store from '../../../store';
import ReactCardFlip from 'react-card-flip';
import { incrementIndexDelayMillis, SIDES } from '../../../utils/constants';
import * as ChatStudyDeckActions from '../../../store/actions/chatStudyDeck';
import StudyCardSide from '../StudyCardSide';
import StudyDeckHeader from '../StudyDeckHeader/StudyDeckHeader';
import styles from './ChatRoomStudyDeck.module.css';
import { endStudyDeck, incrementStudyDeck } from '../../../api/socket';
import ChatEndStudyNotice from '../ChatEndStudyNotice';

const ChatRoomStudyDeck = ({ deck, roomId, userIsHost }) => {
    const { cards, deckName, index, flipped, reachedEndOfDeck, _id: deckId } = deck;

    const cardSideDurationMillis = 5000;

    const [showNextButton, setShowNextButton] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            store.dispatch(ChatStudyDeckActions.setFlipped(true));
            setShowNextButton(true);
        }, cardSideDurationMillis);
    }, [index]);

    if (!deckId) return null;

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
            <StudyDeckHeader endOfDeck={reachedEndOfDeck} deckName={deckName} />
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
                    <div style={{ height: '100px' }}>
                        {showNextButton && userIsHost && (
                            <button className={styles.nextBtn} onClick={onNextClick}>
                                Next
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <ChatEndStudyNotice userIsHost={userIsHost} />
            )}
        </div>
    );
};

export default ChatRoomStudyDeck;
