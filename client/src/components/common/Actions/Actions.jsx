import React from 'react';
import { useHistory } from 'react-router-dom';
import store from '../../../store';
import * as DeckActions from '../../../store/actions/decks';
import ActionCard from '../ActionCard';
import styles from './Actions.module.css';

const ACTIONS = ['Create', 'Stats', 'Browse', 'Nunya'];

const ActionRouteMap = {
    Create: '/create-deck',
    Stats: '/stats',
    Browse: '/browse',
};

const Actions = () => {
    const history = useHistory();

    const onActionClick = (action) => {
        const page = ActionRouteMap[action];
        if (action === 'Create') {
            store.dispatch(DeckActions.setSelectedDeck({}));
            store.dispatch(DeckActions.setAddedCards([]));
        }
        history.push(page);
    };

    return (
        <div className={styles.actions}>
            {ACTIONS.map((action) => (
                <ActionCard key={action} title={action} onClick={() => onActionClick(action)} />
            ))}
        </div>
    );
};

export default Actions;
