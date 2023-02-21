import React from 'react';
import { updateUser } from '../../../api';
import store from '../../../store';
import * as UserActions from '../../../store/actions/user';
import styles from './FollowUserButton.module.css';

const FollowUserButton = ({ usersId, alreadyFollowing }) => {
    const onClick = async () => {
        const { user } = store.getState();

        try {
            const newUser = {
                ...user,
                following: [...user.following, usersId],
            };
            console.log('\n new user ? ', newUser, '\n\n');
            const response = await updateUser(newUser);
            console.log('\n response from updating user = ', response, '\n');
            store.dispatch(UserActions.updateUser(response.data.user));
        } catch (e) {
            console.log('\n error in trying to follow user = ', e, '\n\n');
        }
    };

    return (
        <>
            {alreadyFollowing ? (
                <p>You are already following this user</p>
            ) : (
                <button className={styles.followUserButton} onClick={onClick}>
                    Follow User?
                </button>
            )}
        </>
    );
};

export default FollowUserButton;
