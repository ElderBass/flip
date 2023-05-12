import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import store from '../../../store';
import * as UserActions from '../../../store/actions/user';
import { getAllUserDecks, getOneUser, updateUser } from '../../../api';
import { trimEmail } from '../../../utils/helpers/emailHelpers';
import { getFollowedUsers } from '../../../utils/helpers/getFollowedUsers';
import Header from '../../common/Header/Header';
import UserFeedCarousel from '../../common/UserFeedCarousel';
import Actions from '../../common/Actions';
import styles from './UserPage.module.css';
import LoadingScreen from '../../LoadingScreen';

const UserPage = () => {
    const { user } = store.getState();
    const { following } = user;

    const { userId } = useParams();
    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [userDecks, setUserDecks] = useState([]);
    const [favoriteDecks, setFavoriteDecks] = useState([]);
    const [followedUsers, setFollowedUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [isFollowing, setIsFollowing] = useState(user.following.includes(userId));

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
                    getFollowedUsers().then((users) => setFollowedUsers(users));
                }
            } catch (e) {
                console.log('\n error in getting user decks/favorites on UserHome: ', e, '\n\n');
            }
        };
        setTimeout(() => {
            getUserData();
            setLoading(false);
        }, 250);
    }, [userId, following]);

    const onFollowToggle = async () => {
        try {
            let updatedFollowing;
            if (isFollowing) {
                updatedFollowing = user.following.filter((id) => id !== userId);

            } else {
                updatedFollowing = [...user.following, userId];
            }
            const newUser = {
                ...user,
                following: updatedFollowing
            };

            await updateUser(newUser);
            store.dispatch(UserActions.updateUser(newUser));
            setIsFollowing(!isFollowing);
        } catch (e) {
            console.log('\n error in trying to follow user = ', e, '\n\n');
        }
    };

    return (
        <div className={styles.userPage}>
            <Header />
            <div className={styles.content}>
                {loading ? (
                    <LoadingScreen />
                ) : (
                    <div className={styles.feed}>
                        <div className={styles.headerContent}>
                            <button
                                className={`${styles.headerBtn} ${styles.backBtn}`}
                                onClick={() => history.goBack()}
                            >
                                Back
                            </button>
                            <h3 className={styles.usernameHeader}>
                                Viewing <span className={styles.username}>{username}</span>'s
                                Profile
                            </h3>
                            <button
                                className={`${styles.headerBtn} ${styles.toggleFollow}`}
                                onClick={onFollowToggle}
                            >
                                {isFollowing ? 'Unfollow' : 'Follow'}
                            </button>
                        </div>
                        <UserFeedCarousel type="Decks" content={userDecks} />
                        <UserFeedCarousel type="Favorites" content={favoriteDecks} />
                        <UserFeedCarousel type="Following" content={followedUsers} />
                    </div>
                )}
                <Actions />
            </div>
        </div>
    );
};

export default UserPage;
