import React, { useRef, useEffect, useState } from 'react';
import { getAllUsers } from '../../../api';
import UserResult from '../UserResult';
import UsersSearchBar from '../UsersSearchBar/UsersSearchBar';
import styles from './BrowsePageContent.module.css';

const BrowsePageContent = () => {
    const searchRef = useRef(null);
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

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

    return (
        <div className={styles.browsePageContent}>
            <h2 className={styles.header}>Browse Users</h2>
            <UsersSearchBar innerRef={searchRef} allUsers={allUsers} setUsers={setFilteredUsers} />
            <div className={styles.contentContainer}>
                {users.map((user) => (
                    <UserResult user={user} key={user.email} />
                ))}
            </div>
        </div>
    );
};

export default BrowsePageContent;
