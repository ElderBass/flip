import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import store from '../../../store';
import * as DeckActions from '../../../store/actions/decks';
import { ERROR_MESSAGE } from '../../../utils/constants';
import { isDuplicateCard } from '../../../utils/helpers/isDuplicateCard';
import AddedCards from '../AddedCards';
import CreateCardForm from '../CreateCardForm';
import EditDeckActionCard from '../EditDeckActionCard/EditDeckActionCard';
import FinishDeckForm from '../FinishDeckForm';
import styles from './CreateDeckContent.module.css';
import AbortActionConfirmationModal from '../AbortActionConfirmationModal';

const CreateDeckContent = ({ isEdit }) => {
    const {
        decks: { selectedDeck = {}, addedCards },
    } = store.getState();
    const deckName = selectedDeck?.deckName;

    const initialCards = isEdit ? selectedDeck?.cards : addedCards;

    const history = useHistory();

    const [error, setError] = useState('');
    const [currentCard, setCurrentCard] = useState(null);
    const [cards, setCards] = useState(initialCards);
    const [showFinish, setShowFinish] = useState(false);
    const [editingAddedCard, setEditingAddedCard] = useState(false);
    const [showCancelConfirmModal, setShowCancelConfirmModal] = useState(false);

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
        } else if (!isEdit && isDuplicateCard(front, cards) && !editingAddedCard) {
            setError(ERROR_MESSAGE.CREATE_CARD.DUPLICATE);
            resetError();
            return;
        } else {
            const card = { id, front, back };
            const updatedDeck = [...cards, card];
            setCards(updatedDeck);
            store.dispatch(DeckActions.setAddedCards(updatedDeck));
            setCurrentCard(null);
        }
    };

    const onAddedCardClick = (card) => {
        setError('');
        setShowFinish(false);
        setCurrentCard(card);
        setEditingAddedCard(true);
    };

    const onAddCardClick = () => {
        setCurrentCard({ front: '', back: '' });
    };

    const onEditCard = (updatedCard) => {
        if (!updatedCard.front || !updatedCard.back || !updatedCard.id) {
            setError("You can't edit an empty card!");
            resetError();
            return;
        }
        const updatedDeck = cards.map((card) => {
            if (card.id === updatedCard.id) {
                return updatedCard;
            }
            return card;
        });
        setCards(updatedDeck);
        store.dispatch(DeckActions.setAddedCards(updatedDeck));
        setEditingAddedCard(false);
        setCurrentCard(null);
        setError('Card successfully updated');
        resetError();
    };

    const onDeleteCard = (cardId) => {
        const updatedCards = cards.filter((card) => card.id !== cardId);
        setCards(updatedCards);
        store.dispatch(DeckActions.setAddedCards(updatedCards));
        setCurrentCard(null);
    };

    const onCancelDeleteCard = () => {
        setCurrentCard(null);
    };

    const onCancelCreateDeck = () => {
        setShowCancelConfirmModal(true);
    };

    const onCancelConfirmation = () => {
        store.dispatch(DeckActions.setAddedCards([]));
        setCurrentCard(null);
        setCards([]);
        history.goBack();
    };

    return (
        <div className={styles.createDeckContent}>
            {showFinish ? (
                <FinishDeckForm
                    title={deckName}
                    isEdit={isEdit}
                    cards={cards}
                    onCancel={() => setShowFinish(false)}
                />
            ) : showCancelConfirmModal ? (
                <div className={styles.cancelEditDeck}>
                    <AbortActionConfirmationModal
                        message="You really wanna cancel? All of your progress will be lost."
                        deleteFunc={onCancelConfirmation}
                        cancelFunc={() => {
                            setShowCancelConfirmModal(false);
                        }}
                        btnWording="Abandon Deck"
                    />
                </div>
            ) : (
                <div className={styles.createDeckForm}>
                    {isEdit && !currentCard ? (
                        <EditDeckActionCard deckName={deckName} onAddCard={onAddCardClick} />
                    ) : (
                        <CreateCardForm
                            error={error}
                            currentCard={currentCard || {}}
                            submitCard={onSubmitCard}
                            editCard={onEditCard}
                            deleteCard={onDeleteCard}
                            cancelDeleteCard={onCancelDeleteCard}
                            isEdit={editingAddedCard}
                        />
                    )}
                    <div className={styles.actions}>
                        <button
                            disabled={cards.length === 0}
                            className={styles.finishBtn}
                            onClick={() => setShowFinish(true)}
                            type="button"
                        >
                            Finish
                        </button>
                        <button
                            className={styles.cancelBtn}
                            onClick={onCancelCreateDeck}
                            type="button"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            <AddedCards onClick={onAddedCardClick} cards={cards} />
        </div>
    );
};

export default CreateDeckContent;
