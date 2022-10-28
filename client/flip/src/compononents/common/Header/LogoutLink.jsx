import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LogoutLink.module.css'


const LogoutLink = (props) => {

  return (
    <li>
      <Link className={`link ${styles.logout}`} to='/logout'>Logout</Link>
    </li>
  );
}


export default LogoutLink;