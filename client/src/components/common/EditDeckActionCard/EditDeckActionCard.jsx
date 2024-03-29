import React from "react";
import styles from "./EditDeckActionCard.module.css";

const EditDeckActionCard = ({ deckName, onAddCard }) => {
	return (
		<div className={styles.container}>
			<div className={styles.editDeckActionCard}>
				<h2 className={styles.label}>
					Editing Deck: <i>{deckName}</i>
				</h2>
				<h4 className={styles.instructions}>
					Select a card to edit or
				</h4>
				<div className={styles.actions}>
					<button className={styles.addCardBtn} onClick={onAddCard}>
						Add a Card
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditDeckActionCard;
