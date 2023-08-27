import React, { useState, useEffect } from 'react';
import store from '../../../store';
import ReactCardFlip from 'react-card-flip';
import { SIDES } from '../../../utils/constants';
import * as ChatActions from '../../../store/actions/chat';
import StudyCardSide from '../StudyCardSide';
import StudyDeckHeader from '../StudyDeckHeader/StudyDeckHeader';
import styles from './ChatRoomStudyDeck.module.css';
import { incrementStudyDeck } from '../../../api/socket';

const ChatRoomStudyDeck = ({ deck = null, userIsHost }) => {
    const {
        chat: { openRoom },
    } = store.getState();

    const { activeDeck: { index = 0 } = {}, id: roomId } = openRoom;

    const cardSideDurationMillis = 5000;

    const [endOfDeck, setEndOfDeck] = useState(false);
    const [flipped, setFlipped] = useState(false);
    const [showNextButton, setShowNextButton] = useState(false);

    useEffect(() => {
        console.log('\n\n running chat room study deck useEffect \n\n');
        setTimeout(() => {
            setFlipped(true);
            setShowNextButton(true);
        }, cardSideDurationMillis);
    }, [index]);

    if (!deck || !deck.cards) return null;

    const { cards, deckName } = deck;

    const onNextClick = () => {
        const nextIndex = index + 1;
        console.log('\n setting flipped to FALSE \n\n');
        setFlipped(false);
        setShowNextButton(false);
        setTimeout(() => {
            if (nextIndex === cards.length) {
                setEndOfDeck(true);
            } else {
                store.dispatch(ChatActions.setStudyDeckIndex(nextIndex));
                incrementStudyDeck(roomId, nextIndex);
            }
        }, 200);
    };

    return (
        <div className={styles.chatRoomStudyDeck}>
            <StudyDeckHeader deckName={deckName} />
            {!endOfDeck ? (
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
