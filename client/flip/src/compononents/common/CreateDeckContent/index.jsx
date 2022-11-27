import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import store from '../../../store';
import { ERROR_MESSAGE } from '../../../utils/constants';
import { isDuplicateCard } from '../../../utils/helpers/isDuplicateCard';
import AddedCards from '../AddedCards';
import CreateCardForm from '../CreateCardForm';
import FinishDeckForm from '../FinishDeckForm';
import styles from './CreateDeckContent.module.css';

const CreateDeckContent = ({ isEdit }) => {
    const {
        decks: { selectedDeck },
    } = store.getState();
    const { cards, deckName } = selectedDeck;

    const currentCardState = isEdit ? cards[0] : {};
    const initialCards = isEdit ? cards : [];

    const history = useHistory();

    const [error, setError] = useState('');
    const [currentCard, setCurrentCard] = useState(currentCardState);
    const [newDeck, setNewDeck] = useState(initialCards);
    const [showFinish, setShowFinish] = useState(false);

    const isCardFilledOut = (front, back) => front.length && back.length;

    const onSubmitCard = ({ id, front, back }) => {
        setError('');
        if (!isCardFilledOut(front, back)) {
            setError(ERROR_MESSAGE.CREATE_CARD.INCOMPLETE);
            return;
        }
        if (!isEdit && isDuplicateCard(front, newDeck)) {
            setError(ERROR_MESSAGE.CREATE_CARD.DUPLICATE);
            return;
        }
        const card = { id, front, back };
        setNewDeck((prevState) => [...prevState, card]);
    };

    const onAddedCardClick = (card) => {
        setError('');
        setShowFinish(false);
        setCurrentCard(card);
    };

    const onEditCard = (updatedCard) => {
        const updatedDeck = newDeck.map((card) => {
            if (card.id === updatedCard.id) {
                return updatedCard;
            }
            return card;
        });
        setNewDeck(updatedDeck)
    };

    return (
        <div className={styles.createDeckContent}>
            {showFinish ? (
                <FinishDeckForm
                    title={deckName}
                    cards={newDeck}
                    onCancel={() => setShowFinish(false)}
                />
            ) : (
                <div className={styles.createDeckForm}>
                    <CreateCardForm
                        error={error}
                        currentCard={currentCard}
                        submitCard={onSubmitCard}
                        editCard={onEditCard}
                        isEdit={isEdit}
                    />
                    <div className={styles.actions}>
                        <button
                            disabled={newDeck.length === 0}
                            className={styles.finishBtn}
                            onClick={() => setShowFinish(true)}
                            type="button"
                        >
                            Finish
                        </button>
                        <button
                            className={styles.cancelBtn}
                            onClick={() => history.push('/home')}
                            type="button"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            <AddedCards onClick={onAddedCardClick} cards={newDeck} />
        </div>
    );
};

export default CreateDeckContent;
