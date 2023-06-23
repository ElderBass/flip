import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import store from '../../../store';
import { setSelectedDeck } from '../../../store/actions/decks';
import { getAllUsers } from '../../../api';
import UserResult from '../UserResult';
import UsersSearchBar from '../UsersSearchBar/UsersSearchBar';
import styles from './BrowsePageContent.module.css';
import browseResultStyles from '../UserResult/BrowseResult.module.css';

const BrowsePageContent = () => {
    const searchRef = useRef(null);
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const history = useHistory();

    const users = filteredUsers.length ? filteredUsers : allUsers;

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await getAllUsers();
                setAllUsers(response.data.users);
            } catch (e) {
                console.log('\n error in getting all users - ', e, '\n\n');
            }
        };
        getUsers();
    }, []);

    const onUserClick = (userId) => history.push(`/user/${userId}`);

    const onDeckClick = async (deck) => {
        await store.dispatch(setSelectedDeck(deck));
        history.push('/deck');
    };

    return (
        <div className={styles.browsePageContent}>
            <h2 className={styles.header}>Browse Users</h2>
            <UsersSearchBar innerRef={searchRef} allUsers={allUsers} setUsers={setFilteredUsers} />
            <div className={styles.contentContainer}>
                {users.map((user) => (
                    <UserResult
                        onUserClick={onUserClick}
                        onDeckClick={onDeckClick}
                        user={user}
                        styles={browseResultStyles}
                        key={user.email}
                    />
                ))}
            </div>
        </div>
    );
};

export default BrowsePageContent;
