import React, { useRef, useEffect } from 'react';
import { SIDES } from '../../../../utils/constants';
import styles from './CardSide.module.css';

const CardSide = ({ value, onChange, onFlip, side }) => {
    const id = side.toLowerCase();
    const sideRef = useRef(null);

    useEffect(() => {
        sideRef.current && sideRef.current.focus();
    }, [side]);

    return (
        <div className={styles.cardSide}>
            <div className={styles.inputField}>
                <label className={styles.label} htmlFor={id}>
                    {side}
                </label>
                {side === SIDES.FRONT ? (
                    <input
                        ref={sideRef}
                        id={id}
                        className={`${styles.input} ${styles.frontInput}`}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    />
                ) : (
                    <textarea
                        ref={sideRef}
                        id={id}
                        className={`${styles.input} ${styles.backInput}`}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    />
                )}
            </div>
            <button className={styles.flipCardBtn} type="button" onClick={onFlip}>
                -Flip-
            </button>
        </div>
    );
};

export default CardSide;
