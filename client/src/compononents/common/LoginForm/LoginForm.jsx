import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ERROR_MESSAGE, LOCAL_STORAGE_KEYS } from '../../../utils/constants';
import { login } from '../../../utils/login';
import styles from './LoginForm.module.css';

const LoginForm = ({ setError }) => {
    const emailRef = useRef(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formFilledOut, setFormFilledOut] = useState(false);

    const history = useHistory();

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        if (email.length && password.length) {
            setFormFilledOut(true);
        }
    }, [email, password]);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            localStorage.setItem(LOCAL_STORAGE_KEYS.LOGGED_IN, true);
            history.push('/home');
        } catch (e) {
            if (e.response && e.response.status === 404) {
                setError(ERROR_MESSAGE.LOGIN[404]);
            } else if (e.message) {
                setError(e.message);
            } else {
                setError(ERROR_MESSAGE.LOGIN.GENERIC);
            }
        }
    };

    return (
        <form onSubmit={onSubmit} className={styles.loginForm}>
            <h1 className={styles.header}>Login</h1>
            <div className={styles.inputField}>
                <label className={styles.label} htmlFor="email">
                    Email:
                </label>
                <input
                    className={styles.input}
                    ref={emailRef}
                    name="email"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className={styles.inputField}>
                <label className={styles.label} htmlFor="password">
                    Password:
                </label>
                <input
                    className={styles.input}
                    name="password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className={styles.actions}>
                {formFilledOut && (
                    <button className={styles.submitBtn} type="submit">
                        Continue
                    </button>
                )}
            </div>
        </form>
    );
};

export default LoginForm;
