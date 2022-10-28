import React, { useRef, useEffect, useState } from 'react';
import styles from './styles.module.css';

const LoginForm = () => {
    const emailRef = useRef(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() =>  {
        emailRef.current.focus();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('submit to my will!')
    };

    return (
        <form onSubmit={onSubmit} className={styles.loginForm}>
            <h1 className={styles.header}>Login</h1>
            <div className={styles.inputField}>
                <label className={styles.label} htmlFor='email'>Email:</label>
                <input
                    className={styles.input}
                    ref={emailRef}
                    name='email'
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className={styles.inputField}>
                <label className={styles.label} htmlFor='password'>Password:</label>
                <input
                    className={styles.input}
                    name='password'
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className={styles.actions}>
                <button className={styles.submitBtn} type='submit'>Continue</button>
            </div>
        </form>
    )
};

export default LoginForm;
