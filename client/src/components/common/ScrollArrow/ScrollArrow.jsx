import React, { useContext } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './ScrollArrow.module.css';

const ScrollArrow = ({ direction }) => {
    const { isFirstItemVisible, isLastItemVisibile, scrollPrev, scrollNext } =
        useContext(VisibilityContext);

    const onClick = direction === 'Right' ? () => scrollNext() : () => scrollPrev();

    const disabled = direction === 'Right' ? isLastItemVisibile : isFirstItemVisible;
    const ArrowMap = {
        Right: <FontAwesomeIcon icon={faArrowRight} size="3x" />,
        Left: <FontAwesomeIcon icon={faArrowLeft} size="3x" />,
    };

    return (
        <button onClick={onClick} className={styles.scrollArrow} disabled={disabled}>
            {ArrowMap[direction]}
        </button>
    );
};

export default ScrollArrow;
