import React, { useState } from 'react';
import store from '../../../store';
import { ERROR_MESSAGE } from '../../../utils/constants';
import * as DeckActions from '../../../store/actions/decks';
import { createDeck } from '../../../api';
import styles from './FinishDeckForm.module.css';

const FinishDeckForm = ({ cards, onCancel }) => {
    const { DOUBLE_CHECK, NO_NAME, GENERIC } = ERROR_MESSAGE.FINISH_CARD;
    const [error, setError] = useState(DOUBLE_CHECK);
    const [deckName, setDeckName] = useState('');

    const {
        user: { username, _id },
    } = store.getState();

    const onFinishDeck = async (e) => {
        e.preventDefault();
        if (!deckName) {
            setError(NO_NAME);
            return;
        }
        const deckPayload = {
            deckName,
            timestamp: Date.now(),
            author: username,
            userId: _id,
            cards,
        };
        try {
            const result = await createDeck(deckPayload);
            console.log('\n\n result in creating a deck = ', result, '\n\n');
            store.dispatch(DeckActions.addDeck(result));
        } catch (e) {
            console.log('\n\n error in creating deck = ', e, '\n\n');
            setError(GENERIC);
        }
    };

    const onCancelClick = () => {
        setError('');
        onCancel();
    };

    return (
        <div className={styles.finishDeckContainer}>
            <div className={styles.error}>
                {error && <p className={styles.errorMsg}>{error}</p>}
            </div>
            <form onSubmit={onFinishDeck} className={styles.finishDeckForm}>
                <div className={styles.inputField}>
                    <label className={styles.label} htmlFor="deckName">
                        Give the Deck a Name:
                    </label>
                    <hr className={styles.line} />
                    <input
                        className={styles.input}
                        id="deckName"
                        value={deckName}
                        onChange={(e) => setDeckName(e.target.value)}
                    />
                </div>
                <div className={styles.actions}>
                    <button className={styles.submitBtn} type="submit">
                        Submit Deck
                    </button>
                    <button className={styles.cancelBtn} type="button" onClick={onCancelClick}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FinishDeckForm;
