import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addUser } from '../../../api';
import { ERROR_MESSAGE } from '../../../utils/constants';
import { isValidEmail } from '../../../utils/helpers/emailHelpers';
import { validatePassword } from '../../../utils/helpers/validatePassword';
import { login } from '../../../utils/login';
import styles from './SignupForm.module.css';

const SignupForm = ({ setError }) => {
    const emailRef = useRef(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formFilledOut, setFormFilledOut] = useState(false);

    const history = useHistory();

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        if (email.length && password.length && confirmPassword.length) {
            setFormFilledOut(true);
        }
    }, [email, password, confirmPassword]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isValidEmail(email)) {
            setError(ERROR_MESSAGE.SIGNUP.INVALID_EMAIL);
            return;
        }
        const passwordResult = validatePassword(password);

        if (!passwordResult.isValid) {
            setError(passwordResult.msg);
            return;
        }
        if (password !== confirmPassword) {
            setError(ERROR_MESSAGE.SIGNUP.PASSWORD_MISMATCH);
            return;
        }
        try {
            await addUser({ email, password });
            await login({ email, password });
            history.push('/home');
        } catch (e) {
            console.log('\n\n error on adding user - ', e, '\n\n');
        }
    };

    return (
        <form onSubmit={onSubmit} className={styles.signupForm}>
            <h1 className={styles.header}>Sign Up</h1>
            <div className={styles.inputField}>
                <label className={styles.label} htmlFor="email">
                    Email:
                </label>
                <input
                    className={styles.input}
                    ref={emailRef}
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
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className={styles.inputField}>
                <label className={styles.label} htmlFor="confirmPassword">
                    Confirm:
                </label>
                <input
                    className={styles.input}
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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

export default SignupForm;
