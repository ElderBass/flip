import React, { useState, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';
import { SIDES } from '../../../utils/constants';
import StudyCardSide from '../StudyCardSide';
import StudyDeckHeader from '../StudyDeckHeader/StudyDeckHeader';
import styles from './ChatRoomStudyDeck.module.css';

const ChatRoomStudyDeck = ({ deckName, cards }) => {
    const cardSideDurationMillis = 5000;

    const [endOfDeck, setEndOfDeck] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [showNextButton, setShowNextButton] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setFlipped(true);
            setShowNextButton(true);
        }, cardSideDurationMillis);
    }, [currentCardIndex]);

    if (!cards) {
        return null;
    }

    const onNextClick = () => {
        setFlipped(false);
        setShowNextButton(false);
        setTimeout(() => {
            if (currentCardIndex + 1 === cards.length) {
                setEndOfDeck(true);
            } else {
                setCurrentCardIndex(currentCardIndex + 1);
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
                            value={cards[currentCardIndex].front}
                            side={SIDES.FRONT}
                            flipWithFriends={true}
                        />
                        <StudyCardSide
                            value={cards[currentCardIndex].back}
                            side={SIDES.BACK}
                            flipWithFriends={true}
                        />
                    </ReactCardFlip>
                    {showNextButton && (
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
