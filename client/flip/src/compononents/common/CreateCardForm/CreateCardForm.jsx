import React, { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { v4 as uuidv4 } from 'uuid';
import { SIDES } from '../../../utils/constants';
import CardSide from './CardSide';
import styles from './CreateCardForm.module.css';

const cardStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
    width: '100%',
};

const backStyles = {
    ...cardStyles,
    background: 'rgb(246, 238, 146)',
};

const CreateCardForm = ({ error, submitCard, currentCard, editCard, isEdit, editingAddedCard }) => {
    const [front, setFront] = useState(currentCard.front || '');
    const [back, setBack] = useState(currentCard.back || '');
    const [flipped, setFlipped] = useState(false);

    const onFlip = () => setFlipped(!flipped);

    const resetCard = () => {
        setFront('');
        setBack('');
        setFlipped(false);
    };

    const onSubmitCard = (e) => {
        e.preventDefault();
        const id = uuidv4();
        submitCard({ front, back, id });
        resetCard();
    };
    
    const onEditCard = () => {
        editCard({ front, back, id: currentCard.id });
        if (editingAddedCard) {
            resetCard();
        }
    };

    useEffect(() => {
        if (currentCard.front && currentCard.back) {
            setFront(currentCard.front);
            setBack(currentCard.back);
        }
    }, [currentCard]);

    return (
        <div className={styles.createCardFormContainer}>
            <div className={styles.error}>
                {error && <p className={styles.errorMsg}>{error}</p>}
            </div>
            <form className={styles.createCardForm}>
                <ReactCardFlip
                    cardStyles={{ front: cardStyles, back: backStyles }}
                    isFlipped={flipped}
                >
                    <CardSide
                        value={front}
                        onChange={setFront}
                        onFlip={onFlip}
                        side={SIDES.FRONT}
                    />
                    <CardSide value={back} onChange={setBack} onFlip={onFlip} side={SIDES.BACK} />
                </ReactCardFlip>
            </form>
            <div className={styles.addCard}>
                {!isEdit && front.length && back.length ? (
                    <button className={styles.addCardBtn} type="button" onClick={onSubmitCard}>
                        Add
                    </button>
                ) : null}
                {isEdit && (
                    <button className={styles.addCardBtn} type="button" onClick={onEditCard}>
                        Update
                    </button>
                )}
            </div>
        </div>
    );
};

export default CreateCardForm;
