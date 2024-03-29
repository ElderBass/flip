import React, { useState, useEffect } from "react";
import store from "../../../store";
import Header from "../../common/Header/Header";
import styles from "./Home.module.css";
import Actions from "../../common/Actions";
import UserFeedCarousel from "../../common/UserFeedCarousel";
import { getAllUserDecks } from "../../../api";
import { getFollowedUsers } from "../../../utils/helpers/getFollowedUsers";
import LoadingScreen from "../../LoadingScreen";
import { useHistory } from "react-router-dom";
import { PAGES } from "../../../utils/constants";

const Home = () => {
	const { user, chat } = store.getState();
	const history = useHistory();
	const { favorites, following, _id } = user;

	const [loading, setLoading] = useState(true);
	const [userDecks, setUserDecks] = useState([]);
	const [followedUsers, setFollowedUsers] = useState([]);

	// TODO: Hacky fix for not navigating to Home page if chat is still active
	useEffect(() => {
		if (chat.openRoom && chat.openRoom.id) {
			history.push(PAGES.CHAT);
		}
	}, [chat, history]);

	useEffect(() => {
		const getUserData = async () => {
			try {
				if (following.length) {
					getFollowedUsers(following).then((users) =>
						setFollowedUsers(users)
					);
				}
				const deckResponse = await getAllUserDecks(_id);
				setUserDecks(deckResponse.data.decks);
			} catch (e) {
				console.log(
					"\n error in getting user decks/favorites on UserHome: ",
					e,
					"\n\n"
				);
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
						<UserFeedCarousel
							type="Favorites"
							content={favorites}
						/>
						<UserFeedCarousel
							type="Following"
							content={followedUsers}
						/>
					</div>
				)}
				<Actions />
			</div>
		</div>
	);
};

export default Home;
