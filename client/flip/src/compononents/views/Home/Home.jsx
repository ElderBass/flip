import React, { useState, useEffect } from 'react';
import store from '../../../store';
import Header from '../../common/Header/Header';
import styles from './Home.module.css';
import Actions from '../../common/Actions';
import UserFeedCarousel from '../../common/UserFeedCarousel';
import { getAllUserDecks, getOneUser } from '../../../api';

const Home = ({ location }) => {
    const { user } = store.getState();
    const { favorites, following, _id } = user;
    const usersId = location?.state?.usersId || null;

    const userId = usersId || _id;
    const [loading, setLoading] = useState(true);
    const [userDecks, setUserDecks] = useState([]);
    const [followedUsers, setFollowedUsers] = useState([]);
    const alreadyFollowing = usersId && user.following.includes(usersId);

    useEffect(() => {
        const getUserData = async () => {
            try {
                if (following.length) {
                    const users = [];
                    await following.forEach(async (id) => {
                        const response = await getOneUser(id);
                        users.push(response.data.user);
                    });
                    setFollowedUsers(users);
                }
                const deckResponse = await getAllUserDecks(userId);
                setUserDecks(deckResponse.data.decks);
            } catch (e) {
                console.log('\n error in getting user decks/favorites on UserHome: ', e, '\n\n');
            }
            setLoading(false);
        };
        getUserData();
    }, [userId, following]);

    return (
        <div className={styles.homePage}>
            <Header />
            <div className={styles.content}>
                {loading ? (
                    <p>Hol up bro</p>
                ) : (
                    <div className={styles.feed}>
                        <UserFeedCarousel type="Decks" content={userDecks} />
                        <UserFeedCarousel type="Favorites" content={favorites} />
                        <UserFeedCarousel type="Following" content={followedUsers} />
                    </div>
                )}
                <Actions otherUser={{ id: usersId, alreadyFollowing }} />
            </div>
        </div>
    );
};

export default Home;
