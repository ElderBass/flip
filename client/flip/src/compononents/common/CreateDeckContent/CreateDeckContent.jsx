import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import store from '../../../store';
import * as DeckActions from '../../../store/actions/decks';
import { ERROR_MESSAGE } from '../../../utils/constants';
import { isDuplicateCard } from '../../../utils/helpers/isDuplicateCard';
import AddedCards from '../AddedCards';
import CreateCardForm from '../CreateCardForm';
import FinishDeckForm from '../FinishDeckForm';
import styles from './CreateDeckContent.module.css';

const CreateDeckContent = ({ isEdit }) => {
    const {
        decks: { selectedDeck = {}, addedCards },
    } = store.getState();
    const cards = selectedDeck?.cards;
    const deckName = selectedDeck?.deckName;

    const currentCardState = isEdit ? cards[0] : {};
    const initialCards = isEdit ? cards : addedCards;

    const history = useHistory();

    const [error, setError] = useState('');
    const [currentCard, setCurrentCard] = useState(currentCardState);
    const [newDeck, setNewDeck] = useState(initialCards);
    const [showFinish, setShowFinish] = useState(false);
    const [editingAddedCard, setEditingAddedCard] = useState(false);

    const isCardFilledOut = (front, back) => front.length && back.length;

    const resetError = () => {
        setTimeout(() => {
            setError('');
        }, 2000);
    };

    const onSubmitCard = ({ id, front, back }) => {
        setError('');
        if (!isCardFilledOut(front, back)) {
            setError(ERROR_MESSAGE.CREATE_CARD.INCOMPLETE);
            resetError();
            return;
        } else if (!isEdit && isDuplicateCard(front, newDeck) && !editingAddedCard) {
            setError(ERROR_MESSAGE.CREATE_CARD.DUPLICATE);
            resetError();
            return;
        } else {
            const card = { id, front, back };
            const updatedDeck = [...newDeck, card];
            setNewDeck(updatedDeck);
            store.dispatch(DeckActions.setAddedCards(updatedDeck));
        }
    };

    const onAddedCardClick = (card) => {
        setError('');
        setShowFinish(false);
        setCurrentCard(card);
        setEditingAddedCard(true);
    };

    const onEditCard = (updatedCard) => {
        if (!updatedCard.front || !updatedCard.back || !updatedCard.id) {
            setError("You can't edit an empty card!");
            resetError();
            return;
        }
        const updatedDeck = newDeck.map((card) => {
            if (card.id === updatedCard.id) {
                return updatedCard;
            }
            return card;
        });
        setNewDeck(updatedDeck);
        store.dispatch(DeckActions.setAddedCards(updatedDeck));
        setEditingAddedCard(false);
        setError('Card successfully updated');
        resetError();
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
                        isEdit={isEdit || editingAddedCard}
                        editingAddedCard={editingAddedCard}
                    />
                    <div className={styles.actions}>
                        <button
                            disabled={addedCards.length === 0}
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
