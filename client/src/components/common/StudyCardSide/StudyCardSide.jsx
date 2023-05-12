import React from 'react';
import { SIDES } from '../../../utils/constants';
import styles from './StudyCardSide.module.css';

const StudyCardSide = ({ onFlip, value, side }) => {
    const textClass = side === SIDES.FRONT ? styles.frontValue : styles.backValue;

    return (
        <div className={styles.studyCardSide}>
            <div className={styles.headerSpace}>
                {side}
            </div>
            <div className={styles.sideValue}>
                <p className={textClass}>{value}</p>
            </div>
            <button className={styles.flipCardBtn} type="button" onClick={onFlip}>
                -Flip-
            </button>
        </div>
    );
};

export default StudyCardSide;
