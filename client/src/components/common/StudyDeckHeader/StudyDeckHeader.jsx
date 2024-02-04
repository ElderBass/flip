import React from "react";
import styles from "./StudyDeckHeader.module.css";

const StudyDeckHeader = ({ deckName, endOfDeck }) => {
	const heading = endOfDeck ? "Finished Studying" : "Studying";
	return (
		<div className={styles.studyDeckHeader}>
			<h2>
				{heading}{" "}
				<span className={styles.deckName}>
					<i>{deckName}</i>
				</span>
			</h2>
		</div>
	);
};

export default StudyDeckHeader;
