import React from 'react';
import { useHistory } from 'react-router-dom';
import store from '../../../../store';
import * as DeckActions from '../../../../store/actions/decks';
// import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import styles from './Deck.module.css';

const Deck = ({ item }) => {
    const { deckName } = item;
    // const visibility = useContext(VisibilityContext);
    const history = useHistory();

    const onClick = () => {
        store.dispatch(DeckActions.setSelectedDeck(item));
        history.push('/deck');
    };

    return (
        <div onClick={onClick} className={styles.deckCarouselItem}>
            <hr className={styles.line} />
            <div className={styles.name}>
                {deckName}
            </div>
        </div>
    );
};

export default Deck;
