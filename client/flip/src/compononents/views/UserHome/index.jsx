import React from 'react';
import store from '../../../store';
import Header from '../../common/Header/Header';
import styles from './UserHome.module.css';

const UserHome = () => {
  const { user } = store.getState();

  return (
    <div className={styles.userHomePage}>
      <Header />
      <div className={styles.userName}>
        Greetings, {user.email}!
      </div>
    </div>
  );
};

export default UserHome;
