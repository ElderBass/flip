import React, { useRef, useEffect, useState } from 'react';
import styles from './Signup.module.css';

const SignupForm = ({ flipped }) => {
    const emailRef = useRef(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formFilledOut, setFormFilledOut] = useState(false);

    useEffect(() =>  {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        if (email.length && password.length && confirmPassword.lenght) {
            setFormFilledOut(true);
        }
    }, [email, password, confirmPassword]);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('submit to my will!');
    };

    return (
        <form onSubmit={onSubmit} className={styles.signupForm}>
            <h1 className={styles.header}>Sign Up</h1>
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
            <div className={styles.inputField}>
                <label className={styles.label} htmlFor='confirmPassword'>Confirm:</label>
                <input
                    className={styles.input}
                    name='confirmPassword'
                    type='confirmPassword'
                    id='confirmPassword'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <div className={styles.actions}>
                {formFilledOut && (
                    <button className={styles.submitBtn} type='submit'>Continue</button>
                )}
            </div>
        </form>
    )
};

export default SignupForm;
