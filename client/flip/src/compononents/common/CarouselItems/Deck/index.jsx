import React, { useContext } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import styles from './Deck.module.css';

const Deck = ({ item }) => {
    const visibility = useContext(VisibilityContext);

    return (
        <div className={styles.deckCarouselItem}>
            <hr className={styles.line} />
            <div className={styles.name}>
                {item.deckName}
            </div>
        </div>
    );
};

export default Deck;
