import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
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

const CreateCardForm = ({ error, submitCard, currentCard }) => {
    const [front, setFront] = useState(currentCard.front || '');
    const [back, setBack] = useState(currentCard.back || '');
    const [flipped, setFlipped] = useState(false);

    const onFlip = () => setFlipped(!flipped);

    const onSubmitCard = (e) => {
        e.preventDefault();
        submitCard({ front, back });
        setFront('');
        setBack('');
        setFlipped(false);
    };

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
                {front.length && back.length ? (
                    <button className={styles.addCardBtn} type="button" onClick={onSubmitCard}>
                        Add
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default CreateCardForm;
