import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import store from '../../../store';
import { SIDES } from '../../../utils/constants';
import AddedCards from '../AddedCards';
import EndOfDeck from '../EndOfDeck';
import StudyCardSide from '../StudyCardSide';
import styles from './StudyDeck.module.css';

const StudyDeck = () => {
    const {
        decks: {
            selectedDeck: { cards },
        },
    } = store.getState();

    const [endOfDeck, setEndOfDeck] = useState(false);
    const [currentCards, setCurrentCards] = useState(cards);
    const [cardsToStudy, setCardsToStudy] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    const onFlip = () => setFlipped(!flipped);

    const onActionClick = (nailedIt) => {
        setFlipped(false);

        if (!nailedIt) {
            const updatedStudyCards = [...cardsToStudy, currentCards[currentCardIndex]];
            setCardsToStudy(updatedStudyCards);
        }

        if (currentCardIndex + 1 === currentCards.length) {
            setCurrentCardIndex(0);
            setEndOfDeck(true);
            return;
        }
        setTimeout(() => {
            setCurrentCardIndex(currentCardIndex + 1);
        }, 300);
    };

    const onAddedCardClick = () => {};

    const onStudyAgain = (restartDeck) => {
        const studyCards = restartDeck ? cards : cardsToStudy;
        setCurrentCards(studyCards);
        setCardsToStudy([]);
        setEndOfDeck(false);
    };

    return (
        <div className={styles.studyDeckContent}>
            <div className={styles.studyDeckContainer}>
                {endOfDeck ? (
                    <EndOfDeck onStudyAgain={onStudyAgain} />
                ) : (
                    <ReactCardFlip isFlipped={flipped}>
                        <StudyCardSide
                            value={currentCards[currentCardIndex].front}
                            onFlip={onFlip}
                            side={SIDES.FRONT}
                        />
                        <StudyCardSide
                            value={currentCards[currentCardIndex].back}
                            onFlip={onFlip}
                            side={SIDES.BACK}
                        />
                    </ReactCardFlip>
                )}
                {!endOfDeck && (
                    <div className={styles.actions}>
                        <button
                            className={styles.studyAgain}
                            type="button"
                            onClick={() => onActionClick(false)}
                        >
                            Study Again
                        </button>
                        <button
                            className={styles.nailedIt}
                            type="button"
                            onClick={() => onActionClick(true)}
                        >
                            Nailed It
                        </button>
                    </div>
                )}
            </div>
            <AddedCards isStudy={true} onClick={onAddedCardClick} cards={cardsToStudy} />
        </div>
    );
};

export default StudyDeck;
