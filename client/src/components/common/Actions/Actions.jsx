import React from 'react';
import { useHistory } from 'react-router-dom';
import store from '../../../store';
import * as DeckActions from '../../../store/actions/decks';
import ActionCard from '../ActionCard';
import styles from './Actions.module.css';

const ActionRouteMap = {
    Create: '/create-deck',
    Browse: '/browse',
    Chat: '/chat',
};

const Actions = () => {
    const history = useHistory();

    const onActionClick = (route) => {
        if (route === ActionRouteMap.Create) {
            store.dispatch(DeckActions.setSelectedDeck({}));
            store.dispatch(DeckActions.setAddedCards([]));
        }
        history.push(route);
    };

    return (
        <div className={styles.actions}>
            {Object.entries(ActionRouteMap).map(([key, value]) => (
                <ActionCard key={key} title={key} onClick={() => onActionClick(value)} />
            ))}
        </div>
    );
};

export default Actions;
