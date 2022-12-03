import React, { useState, useEffect } from 'react';
import store from '../../../store';
import Header from '../../common/Header/Header';
import styles from './UserHome.module.css';
import Actions from '../../common/Actions';
import UserFeedCarousel from '../../common/UserFeedCarousel';
import { getAllUserDecks } from '../../../api';

const UserHome = () => {
  const { user } = store.getState();
  const { favorites, following, _id } = user;

  const [userDecks, setUserDecks] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const deckResponse = await getAllUserDecks(_id);
        setUserDecks(deckResponse.data.decks);
      } catch (e) {
        console.log('\n error in getting user decks/favorites on UserHome: ', e, '\n\n');
      }
    };
    getUserData();
  }, [_id]);

  return (
    <div className={styles.userHomePage}>
      <Header />
      <div className={styles.userContent}>
        <div className={styles.userFeed}>
          <UserFeedCarousel type="Decks" content={userDecks} />
          <UserFeedCarousel type="Favorites" content={favorites} />
          <UserFeedCarousel type="Following" content={following} />
        </div>
        <Actions />
      </div>
    </div>
  );
};

export default UserHome;
