import React from 'react';
import { useHistory } from 'react-router-dom';
import { getOneDeck } from '../../../../api';
import store from '../../../../store';
import { setSelectedDeck } from '../../../../store/actions/decks';
import styles from './Deck.module.css';

const Deck = ({ item, itemId }) => {
    const { deckName } = item;
    const history = useHistory();

    const onClick = async () => {
        try {
            const response = await getOneDeck(itemId);
            store.dispatch(setSelectedDeck(response.data.deck));
            history.push('/deck');
        } catch (e) {
            console.log('\n error in getting single deck to set as selected deck: ', '\n\n');
        }
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
