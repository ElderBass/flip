import React from 'react';
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
    background: 'rgb(199, 107, 252)',
};

const CreateCardForm = (props) => {
    const { front, setFront, back, setBack, flipped, setFlipped } = props;

    const onFlip = () => setFlipped(!flipped);

    return (
        <div className={styles.createCardContainer}>
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
        </div>
    );
};

export default CreateCardForm;
