import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ERROR_MESSAGE } from '../../../utils/constants';
import { isDuplicateCard } from '../../../utils/helpers/isDuplicateCard';
import AddedCards from '../AddedCards';
import CreateCardForm from '../CreateCardForm';
import FinishDeckForm from '../FinishDeckForm';
import styles from './CreateDeckContent.module.css';

const CreateDeckContent = () => {
    const history = useHistory();

    const [error, setError] = useState('');
    const [currentCard, setCurrentCard] = useState({});
    const [newDeck, setNewDeck] = useState([]);
    const [showFinish, setShowFinish] = useState(false);

    const isCardFilledOut = (front, back) => front.length && back.length;

    const onSubmitCard = ({ front, back }) => {
        setError('');
        if (!isCardFilledOut(front, back)) {
            setError(ERROR_MESSAGE.CREATE_CARD.INCOMPLETE);
            return;
        }
        if (isDuplicateCard(front, newDeck)) {
            setError(ERROR_MESSAGE.CREATE_CARD.DUPLICATE);
            return;
        }
        const card = { front, back };
        setNewDeck((prevState) => [...prevState, card]);
    };

    const onAddedCardClick = (card) => {
        setError('');
        setShowFinish(false);
        setCurrentCard(card);
    };

    return (
        <div className={styles.createDeckContent}>
            {showFinish ? (
                <FinishDeckForm onCancel={() => setShowFinish(false)} />
            ) : (
                <div className={styles.createDeckForm}>
                    <div className={styles.error}>
                        {error && <p className={styles.errorMsg}>{error}</p>}
                    </div>
                    <CreateCardForm currentCard={currentCard} submitCard={onSubmitCard} />
                    <div className={styles.actions}>
                        <button
                            className={styles.cancelBtn}
                            onClick={() => history.push('/home')}
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            className={styles.finishBtn}
                            disabled={!newDeck.length}
                            onClick={() => setShowFinish(true)}
                        >
                            Finish
                        </button>
                    </div>
                </div>
            )}
            <AddedCards onClick={onAddedCardClick} cards={newDeck} />
        </div>
    );
};

export default CreateDeckContent;
