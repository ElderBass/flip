import React from "react";
import Header from "../../common/Header/Header";
import styles from "./CreateDeck.module.css";
import CreateDeckContent from "../../common/CreateDeckContent";

const CreateDeck = ({ location }) => {
	const isEdit = location?.state?.isEdit || null;
	return (
		<div className={styles.createDeckPage}>
			<Header />
			<CreateDeckContent isEdit={isEdit} />
		</div>
	);
};

export default CreateDeck;
