import React, { useContext } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './ScrollCaret.module.css';

const ScrollCaret = ({ direction }) => {
    const { isFirstItemVisible, isLastItemVisibile, scrollPrev, scrollNext } =
        useContext(VisibilityContext);

    const onClick = direction === 'Right' ? () => scrollNext() : () => scrollPrev();

    const disabled = direction === 'Right' ? isLastItemVisibile : isFirstItemVisible;
    const ArrowMap = {
        Right: <FontAwesomeIcon icon={faCaretRight} size="2x" />,
        Left: <FontAwesomeIcon icon={faCaretLeft} size="2x" />,
    };

    return (
        <button onClick={onClick} className={styles.scrollCaret} disabled={disabled}>
            {ArrowMap[direction]}
        </button>
    );
};

export default ScrollCaret;
