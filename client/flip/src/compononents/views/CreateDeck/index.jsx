import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import store from '../../../store';
import * as DeckActions from '../../../store/actions/decks';
import Header from '../../common/Header/Header';
import { createDeck } from '../../../api';
import CreateCardForm from '../../common/CreateCardForm';
import { ERROR_MESSAGE } from '../../../utils/constants';
import { isDuplicateCard } from '../../../utils/helpers/isDuplicateCard';
import styles from './CreateDeck.module.css';

const CreateDeck = () => {
    const history = useHistory();
    const frontRef = useRef(null);

    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [error, setError] = useState('');
    const [newDeck, setNewDeck] = useState([]);
    const [flipped, setFlipped] = useState(false);

    const isCardFilledOut = () => front.length && back.length;

    const onFinishDeck = async () => {
        try {
            const result = await createDeck(newDeck);
            console.log('\n\n result in creating a deck = ', result, '\n\n');
            store.dispatch(DeckActions.addDeck(newDeck));
        } catch (e) {
            console.log('\n\n error in creating deck = ', e, '\n\n');
        }
    };

    useEffect(() => {
        if (frontRef.current) {
            frontRef.current.focus();
        }
    }, [front]);

    const onSubmitCard = (e) => {
        e.preventDefault();
        setError('');
        if (!isCardFilledOut()) {
            setError(ERROR_MESSAGE.CREATE_CARD.INCOMPLETE);
            return;
        }
        if (isDuplicateCard(front, newDeck)) {
            setError(ERROR_MESSAGE.CREATE_CARD.DUPLICATE);
            return;
        }
        const card = { front, back };
        setNewDeck((prevState) => [...prevState, card]);
        setFront('');
        setBack('');
        setFlipped(false);
    };

    return (
        <div className={styles.createDeckPage}>
            <Header />
            <div className={styles.createDeckContentWrapper}>
                <div className={styles.createDeckContent}>
                    <div className={styles.error}>
                        {error && <p className={styles.errorMsg}>{error}</p>}
                    </div>
                    <CreateCardForm
                        front={front}
                        back={back}
                        setFront={setFront}
                        setBack={setBack}
                        flipped={flipped}
                        setFlipped={setFlipped}
                    />
                    <div className={styles.addCard}>
                        {isCardFilledOut() ? (
                            <button
                                className={styles.addCardBtn}
                                type="button"
                                onClick={onSubmitCard}
                            >
                                Add
                            </button>
                        ) : null}
                    </div>
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
                            onClick={onFinishDeck}
                        >
                            Finish
                        </button>
                    </div>
                </div>
                <div className={styles.addedCardsContainer}>
                    <h3 className={styles.addedCardsHeader}>Cards in Deck:</h3>
                    <hr className={styles.line} />
                    <div className={styles.addedCards}>
                        {newDeck.length
                            ? newDeck.map((card) => (
                                  <div key={card.front} className={styles.addedCard}>
                                      <p className={styles.addedCardLabel}>{card.front}</p>
                                  </div>
                              ))
                            : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateDeck;
