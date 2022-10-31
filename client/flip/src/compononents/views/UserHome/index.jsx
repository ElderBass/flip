import React from 'react';
import store from '../../../store';
import UserDecks from '../../common/UserDecks';
import ActionCard from '../../common/ActionCard';
import Header from '../../common/Header/Header';
import styles from './UserHome.module.css';

const ACTIONS = ['Create', 'Stats', 'Browse'];

const UserHome = () => {
  const { user } = store.getState();

  const onActionClick = action => {
    console.log('\n on action click ', action, '\n\n');
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
              onClick={onActionClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
