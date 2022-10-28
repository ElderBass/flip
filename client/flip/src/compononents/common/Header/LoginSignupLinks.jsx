import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LoginSignupLinks.module.css'

const LoginSignupLinks = (props) => {

  return (
    <>
      <li>
        <Link className={`link ${styles.login}`} to='/login'>Login</Link>
      </li>
      <li className={`link ${styles.signup}`}>
        <Link className='link' to='/signup'>Signup</Link>
      </li>
    </>
  );
}


export default LoginSignupLinks;