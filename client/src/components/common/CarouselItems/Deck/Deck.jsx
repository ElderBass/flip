import React from 'react';
import { useHistory } from 'react-router-dom';
import { getOneDeck } from '../../../../api';
import store from '../../../../store';
import { setSelectedDeck } from '../../../../store/actions/decks';
import CarouselItem from '../CarouselItem';

const Deck = ({ item, itemId, classes }) => {
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
        <CarouselItem onClick={onClick} label={deckName} classes={classes} />
    );
};

export default Deck;
