import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../../api';
import UserResult from '../UserResult';
import styles from './BrowsePageContent.module.css';

const BrowsePageContent = () => {
    const [allUsers, setAllUsers] = useState([]);

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
            <div className={styles.contentContainer}>
                {allUsers.map((user) => (
                    <UserResult user={user} key={user.email} />
                ))}
            </div>
        </div>
    );
};

export default BrowsePageContent;
