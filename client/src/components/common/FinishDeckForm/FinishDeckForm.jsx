import React from "react";
import styles from "./FinishDeckForm.module.css";

const FinishDeckForm = ({ onCancel, onSubmitDeck }) => {
	return (
		<div className={styles.finishDeckContainer}>
			<form
				onSubmit={(e) => onSubmitDeck(e)}
				className={styles.finishDeckForm}
			>
				<div className={styles.header}>Canonize Deck</div>
				<h2 className={styles.modalHeading}>
					<p>All done? Be sure to double-check your cards!</p>
				</h2>
				<div className={styles.actions}>
					<button className={styles.submitBtn} type="submit">
						Submit Deck
					</button>
					<button
						className={styles.cancelBtn}
						type="button"
						onClick={onCancel}
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default FinishDeckForm;
