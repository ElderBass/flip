import React from 'react';
import store from '../../../store';
import Header from '../../common/Header/Header';
import styles from './UserHome.module.css';
import Actions from '../../common/Actions';
import UserFeedCarousel from '../../common/UserFeedCarousel';

const UserHome = () => {
  const { user } = store.getState();
  const { decks, favorites, following } = user;

  return (
    <div className={styles.userHomePage}>
      <Header />
      <div className={styles.userContent}>
        <div className={styles.userFeed}>
          <UserFeedCarousel type="Decks" content={decks} />
          <UserFeedCarousel type="Favorites" content={favorites} />
          <UserFeedCarousel type="Following" content={following} />
        </div>
        <Actions />
      </div>
    </div>
  );
};

export default UserHome;
