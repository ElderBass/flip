import React, { useState } from 'react';
import store from '../../../store';
import { useHistory } from 'react-router-dom';
import { ERROR_MESSAGE } from '../../../utils/constants';
import * as DeckActions from '../../../store/actions/decks';
import { createDeck, editUserDecks } from '../../../api';
import styles from './FinishDeckForm.module.css';

const FinishDeckForm = ({ cards, onCancel, title }) => {
    const { DOUBLE_CHECK, NO_NAME, GENERIC } = ERROR_MESSAGE.FINISH_CARD;
    const [error, setError] = useState(DOUBLE_CHECK);
    const [deckName, setDeckName] = useState(title || '');

    const history = useHistory();

    const {
        user: { username, _id, decks, email },
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
            const updatedDecks = [...decks, deckPayload];
            await editUserDecks({ email, decks: updatedDecks });
            store.dispatch(DeckActions.addDeck(result.data.data));
            history.push('/home');
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
