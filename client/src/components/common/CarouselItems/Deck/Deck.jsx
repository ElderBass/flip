import React from 'react';
import { useHistory } from 'react-router-dom';
import { getOneDeck } from '../../../../api';
import store from '../../../../store';
import { setSelectedDeck } from '../../../../store/actions/decks';
import CarouselItem from '../CarouselItem';

const Deck = ({ item, itemId, classes, onClick = null }) => {
    const { deckName } = item;
    const history = useHistory();

    const clickHandler = async () => {
        try {
            const response = await getOneDeck(itemId);
            const deck = response.data.deck;
            store.dispatch(setSelectedDeck(deck));
            if (onClick) {
                onClick(deck);
                return;
            }
            history.push('/deck');
        } catch (e) {
            console.log('\n error in getting single deck to set as selected deck: ', '\n\n');
        }
    };

    return (
        <CarouselItem onClick={clickHandler} label={deckName} classes={classes} />
    );
};

export default Deck;
