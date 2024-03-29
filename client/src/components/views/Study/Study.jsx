import React from "react";
import Header from "../../common/Header/Header";
import StudyDeck from "../../common/StudyDeck";
import styles from "./Study.module.css";

const Study = () => {
	return (
		<div className={styles.createDeckPage}>
			<Header />
			<StudyDeck />
		</div>
	);
};

export default Study;
