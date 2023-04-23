import React, { useState, useEffect } from 'react';
import store from '../../../store';
import Header from '../../common/Header/Header';
import styles from './Home.module.css';
import Actions from '../../common/Actions';
import UserFeedCarousel from '../../common/UserFeedCarousel';
import { getAllUserDecks } from '../../../api';
import { getFollowedUsers } from '../../../utils/helpers/getFollowedUsers';
import LoadingScreen from '../../LoadingScreen';

const Home = () => {
    const { user } = store.getState();
    const { favorites, following, _id } = user;

    const [loading, setLoading] = useState(true);
    const [userDecks, setUserDecks] = useState([]);
    const [followedUsers, setFollowedUsers] = useState([]);

    useEffect(() => {
        const getUserData = async () => {
            try {
                if (following.length) {
                    getFollowedUsers(following).then((users) => setFollowedUsers(users))
                }
                const deckResponse = await getAllUserDecks(_id);
                setUserDecks(deckResponse.data.decks);
            } catch (e) {
                console.log('\n error in getting user decks/favorites on UserHome: ', e, '\n\n');
            }
            setLoading(false);
        };
        setTimeout(() => {
            getUserData();
            setLoading(false);
        }, 250);
    }, [_id, following]);

    return (
        <div className={styles.homePage}>
            <Header />
            <div className={styles.content}>
                {loading ? (
                    <LoadingScreen />
                ) : (
                    <div className={styles.feed}>
                        <UserFeedCarousel type="Decks" content={userDecks} />
                        <UserFeedCarousel type="Favorites" content={favorites} />
                        <UserFeedCarousel type="Following" content={followedUsers} />
                    </div>
                )}
                <Actions />
            </div>
        </div>
    );
};

export default Home;
