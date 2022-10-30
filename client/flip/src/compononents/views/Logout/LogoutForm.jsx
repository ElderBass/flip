import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './LogoutForm.module.css'


const LogoutForm = (props) => {
  const { onSubmit } = props;
  const { history } = useHistory();

  const handleCancelLogout = () => {
    history.push('/');
  }

  return (
    <div className={styles.actions}>
      <h1 className={styles.logoutHeader}>
        We'll miss you :)
      </h1>
      <h3 className={styles.logoutButton} onClick={onSubmit}>Logout</h3>
      <button className={styles.cancelButton} onClick={handleCancelLogout} type='button'>Cancel</button>
    </div>
  );
}


export default LogoutForm;