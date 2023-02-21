import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import store from '../../../store';
import Header from '../../common/Header/Header';
import UserFeedCarousel from '../../common/UserFeedCarousel';
import { getAllUserDecks, getOneUser } from '../../../api';
import FollowUserButton from '../../common/FollowUserButton';
import styles from './UserPage.module.css';
import { trimEmail } from '../../../utils/helpers/emailHelpers';

const UserPage = () => {
    const { user } = store.getState();
    const { following } = user;

    const { userId } = useParams();

    const [loading, setLoading] = useState(true);
    const [userDecks, setUserDecks] = useState([]);
    const [favoriteDecks, setFavoriteDecks] = useState([]);
    const [followedUsers, setFollowedUsers] = useState([]);
    const [username, setUsername] = useState('');

    const alreadyFollowing = user.following.includes(userId);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userResponse = await getOneUser(userId);
                const deckResponse = await getAllUserDecks(userId);

                const userData = userResponse.data.user;

                setUserDecks(deckResponse.data.decks);
                setUsername(trimEmail(userData.email));
                setFavoriteDecks(userData.favorites);

                if (userData.following.length) {
                    const users = [];
                    await following.forEach(async (id) => {
                        const user = await getOneUser(id);
                        users.push(user);
                    });
                    setFollowedUsers(users);
                }
            } catch (e) {
                console.log('\n error in getting user decks/favorites on UserHome: ', e, '\n\n');
            }
        };
        getUserData();
        setLoading(false);
    }, [userId, following]);

    // TODO: Pass loading into all the carousels and have a shimmer until content loads?
    return (
        <div className={styles.userPage}>
            <Header />
            <div className={styles.content}>
                {loading ? (
                    <p>Hol up bro</p>
                ) : (
                    <div className={styles.feed}>
                        <h3 className={styles.usernameHeader}>Viewing <span className={styles.username}>{username}</span>'s Profile</h3>
                        <UserFeedCarousel type="Decks" content={userDecks} />
                        <UserFeedCarousel type="Favorites" content={favoriteDecks} />
                        <UserFeedCarousel type="Following" content={followedUsers} />
                    </div>
                )}
                <div className={styles.followUser}>
                    <FollowUserButton usersId={userId} alreadyFollowing={alreadyFollowing} />
                </div>
            </div>
        </div>
    );
};

export default UserPage;
