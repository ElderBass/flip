import React, { useState, useEffect } from 'react';
import styles from './UsersSearchBar.module.css';

const UsersSearchBar = ({ innerRef, allUsers, setUsers }) => {
    const [search, setSearch] = useState('');

    const onChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        if (innerRef && innerRef.current) {
            innerRef.current.focus();
        }
    }, [innerRef]);

    useEffect(() => {
        const filtered = allUsers.filter((user) => user.email.startsWith(search));
        setUsers(filtered);
    }, [setUsers, search, allUsers]);

    return (
        <div className={styles.usersSearchBar}>
            <form className={styles.userSearchForm}>
                <label aria-label="Search for users" htmlFor="userSearch" />
                <input
                    ref={innerRef}
                    className={styles.userSearchInput}
                    placeholder="Search for users by name..."
                    value={search}
                    onChange={onChange}
                />
            </form>
        </div>
    );
};

export default UsersSearchBar;
