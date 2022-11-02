import React from 'react';
import store from '../../../store';
import { useHistory } from 'react-router-dom';
import UserDecks from '../../common/UserDecks';
import ActionCard from '../../common/ActionCard';
import Header from '../../common/Header/Header';
import styles from './UserHome.module.css';

const ACTIONS = ['Create', 'Stats', 'Browse'];

const ActionRouteMap = {
  Create: '/create-deck',
  Stats: '/user-stats',
  Browse: '/browse'
};

const UserHome = () => {
  const history = useHistory();
  const { user } = store.getState();

  const onActionClick = action => {
      const page = ActionRouteMap[action];
      console.log('\n page = ', page, '\n\n');
      history.push(page);
  };

  return (
    <div className={styles.userHomePage}>
      <Header />
      <div className={styles.userContent}>
        <div className={styles.userFeed}>
          <UserDecks decks={user.decks} />
        </div>
        <div className={styles.actions}>
          {ACTIONS.map(action => (
            <ActionCard
              key={action}
              title={action}
              onClick={() => onActionClick(action)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
