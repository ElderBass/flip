import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './NameDeckForm.module.css';

const NameDeckForm = ({ deckName, setDeckName, submitName }) => {
    const history = useHistory();

    const [error, setError] = useState('');

    const onChange = (e) => {
        setError('');
        setDeckName(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!deckName.length) {
            setError('A deck has no name. This cannot be.');
            return;
        }
        submitName(deckName);
    };

    return (
        <div className={styles.nameDeckFormContainer}>
            <div className={styles.error}>
                {error && <p className={styles.errorMsg}>{error}</p>}
            </div>
            <form className={styles.nameDeckForm} onSubmit={onSubmit}>
                <div className={styles.inputField}>
                    <label className={styles.label} htmlFor="deckName">
                        First, give the Deck a Name:
                    </label>
                    <hr className={styles.line} />
                    <input
                        className={styles.input}
                        id="deckName"
                        value={deckName}
                        onChange={onChange}
                    />
                </div>
                <div className={styles.actions}>
                    <button className={styles.submitBtn} type="submit">
                        Confirm Name
                    </button>
                    <button
                        className={styles.cancelBtn}
                        type="button"
                        onClick={() => history.goBack()}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NameDeckForm;
