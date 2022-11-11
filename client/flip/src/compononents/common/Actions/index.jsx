import React from 'react';
import { useHistory } from 'react-router-dom';
import ActionCard from '../ActionCard';
import styles from './Actions.module.css';

const ACTIONS = ['Create', 'Stats', 'Browse'];

const ActionRouteMap = {
    Create: '/create-deck',
    Stats: '/user-stats',
    Browse: '/browse',
};

const Actions = () => {
    const history = useHistory();

    const onActionClick = (action) => {
        const page = ActionRouteMap[action];
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
