import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import store from '../../../store';
import * as DeckActions from '../../../store/actions/decks';
import Header from '../../common/Header/Header';
import { createDeck } from '../../../api';
import styles from './CreateDeck.module.css';
import CreateCardForm from '../../common/CreateCardForm';
import { ERROR_MESSAGE } from '../../../utils/constants';

const CreateDeck = () => {
    const history = useHistory();
    const frontRef = useRef(null);

    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [error, setError] = useState('');
    const [newDeck, setNewDeck] = useState([]);
    const [flipped, setFlipped] = useState('false')

    const onAddCard = (card) => setNewDeck((prevState) => [...prevState, card]);

    const isCardFilledOut = () => front.length && back.length;

    const onFinishDeck = async () => {
        console.log('\n submitting new deck\n');

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
        if (!isCardFilledOut()) {
            setError(ERROR_MESSAGE.CREATE_CARD.INCOMPLETE);
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
                        addToDeck={onAddCard}
                        flipped={flipped}
                        setFlipped={setFlipped}
                    />
                    <div className={styles.addCard}>
                        <button
                            disabled={!isCardFilledOut()}
                            className={styles.addCardBtn}
                            type="button"
                            onClick={onSubmitCard}
                        >
                            Add
                        </button>
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
                <div className={styles.addedCards}>
                    <h3 className={styles.addedCardsHeader}>Cards in Deck:</h3>
                    <hr className={styles.line} />
                    {newDeck.length ? newDeck.map((card) => (
                        <div key={card.front} className={styles.addedCard}>
                            <p className={styles.addedCardLabel}>{card.front}</p>
                        </div>
                    )) : null}
                </div>
            </div>
        </div>
    );
};

export default CreateDeck;
