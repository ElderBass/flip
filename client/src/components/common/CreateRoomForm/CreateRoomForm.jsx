import React, { useState } from 'react';
import { createRoom } from '../../../api/socket';
import store from '../../../store';
import * as ChatActions from '../../../store/actions/chat';
import styles from './CreateRoomForm.module.css';

const CreateRoomForm = () => {
    const [name, setName] = useState('');

    const onChange = (e) => setName(e.target.value);

    const onSubmitRoom = (e) => {
        e.preventDefault();
        createRoom(name);
    };

    const onCancelClick = () => {
        setName('');
        store.dispatch(ChatActions.setModal(null));
    };

    return (
        <form className={styles.createRoomForm} onSubmit={onSubmitRoom}>
            <div className={styles.header}>Create Chat Room</div>
            <div className={styles.inputField}>
                <label className={styles.label} htmlFor="roomName" aria-label="form name">
                    Give this Room a name:
                </label>
                <input
                    className={styles.input}
                    id="roomName"
                    value={name}
                    onChange={onChange}
                    placeholder="Names must not exceed 24 characters"
                />
            </div>
            <div className={styles.actions}>
                <button className={styles.cancel} type="button" onClick={onCancelClick}>
                    Cancel
                </button>
                <button disabled={!name.length} className={styles.confirm} type="submit">
                    Create Room
                </button>
            </div>
        </form>
    );
};

export default CreateRoomForm;