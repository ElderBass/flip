import React, { useEffect, useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { getAllUserDecks } from "../../../api";
import { trimEmail } from "../../../utils/helpers/emailHelpers";
import Deck from "../CarouselItems/Deck";
import ScrollCaret from "../ScrollCaret";

const UserResult = ({ user, onUserClick, onDeckClick, styles }) => {
	const { email, _id } = user;
	const [username, setUsername] = useState("");
	const [decks, setDecks] = useState([]);

	useEffect(() => {
		const getUserDecks = async () => {
			try {
				const response = await getAllUserDecks(_id);
				setDecks(response.data.decks);
				setUsername(trimEmail(email));
			} catch (e) {
				console.log("\n error in getting user decks = ", e, "\n\n");
			}
		};
		getUserDecks();
	}, [email, _id]);

	const RightArrow = <ScrollCaret direction="Right" />;
	const LeftArrow = <ScrollCaret direction="Left" />;

	const deckClasses = {
		container: styles.deckCarouselItem,
		line: styles.line,
		label: styles.label,
	};

	return (
		<div className={styles.userResultContainer}>
			<h4 onClick={() => onUserClick(_id)} className={styles.username}>
				{username}
			</h4>
			{decks.length > 0 ? (
				<ScrollMenu
					RightArrow={RightArrow}
					LeftArrow={LeftArrow}
					scrollContainerClassName={styles.contentContainer}
				>
					{decks.map((item, i) => (
						<Deck
							key={i}
							onClick={() => onDeckClick(item)}
							item={item}
							itemId={item._id}
							classes={deckClasses}
						/>
					))}
				</ScrollMenu>
			) : (
				<div className={styles.noDecks}>This user has no decks</div>
			)}
		</div>
	);
};

export default UserResult;
