import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import store from "../../../store";
import * as DeckActions from "../../../store/actions/decks";
import { ERROR_MESSAGE } from "../../../utils/constants";
import { isDuplicateCard } from "../../../utils/helpers/isDuplicateCard";
import AddedCards from "../AddedCards";
import CreateCardForm from "../CreateCardForm";
import EditDeckActionCard from "../EditDeckActionCard/EditDeckActionCard";
import FinishDeckForm from "../FinishDeckForm";
import styles from "./CreateDeckContent.module.css";
import AbortActionConfirmationModal from "../AbortActionConfirmationModal";
import NameDeckForm from "../NameDeckForm/NameDeckForm";
import { createDeck } from "../../../api";

const PHASES = {
	NAME: "name",
	FINISH: "finish",
	CANCEL_CONFIRM: "cancelConfirm",
	CREATE: "create",
};

const CreateDeckContent = ({ isEdit }) => {
	const {
		decks: { selectedDeck = {}, addedCards },
		user: { username, _id },
	} = store.getState();
	const selectedDeckName = selectedDeck?.deckName;

	const initialCards = isEdit ? selectedDeck?.cards : addedCards;

	const history = useHistory();

	const [phase, setPhase] = useState(isEdit ? PHASES.CREATE : PHASES.NAME);
	const [error, setError] = useState("");
	const [deckName, setDeckName] = useState(selectedDeckName || "");
	const [currentCard, setCurrentCard] = useState(null);
	const [cards, setCards] = useState(initialCards);
	const [editingAddedCard, setEditingAddedCard] = useState(false);

	const isCardFilledOut = (front, back) => front.length && back.length;

	const resetError = () => {
		setTimeout(() => {
			setError("");
		}, 2000);
	};

	const onSubmitCard = ({ id, front, back }) => {
		setError("");
		if (!isCardFilledOut(front, back)) {
			setError(ERROR_MESSAGE.CREATE_CARD.INCOMPLETE);
			resetError();
			return;
		} else if (
			!isEdit &&
			isDuplicateCard(front, cards) &&
			!editingAddedCard
		) {
			setError(ERROR_MESSAGE.CREATE_CARD.DUPLICATE);
			resetError();
			return;
		} else {
			const card = { id, front, back };
			const updatedDeck = [...cards, card];
			setCards(updatedDeck);
			store.dispatch(DeckActions.setAddedCards(updatedDeck));
			setCurrentCard(null);
		}
	};

	const onAddedCardClick = (card) => {
		setError("");
		setPhase(PHASES.NAME);
		setCurrentCard(card);
		setEditingAddedCard(true);
		setPhase(PHASES.CREATE);
	};

	const onAddCardClick = () => {
		setCurrentCard({ front: "", back: "" });
	};

	const onEditCard = (updatedCard) => {
		if (!updatedCard.front || !updatedCard.back || !updatedCard.id) {
			setError("You can't edit an empty card!");
			resetError();
			return;
		}
		const updatedDeck = cards.map((card) => {
			if (card.id === updatedCard.id) {
				return updatedCard;
			}
			return card;
		});
		setCards(updatedDeck);
		store.dispatch(DeckActions.setAddedCards(updatedDeck));
		setEditingAddedCard(false);
		setCurrentCard(null);
		setError("Card successfully updated");
		resetError();
	};

	const onDeleteCard = (cardId) => {
		const updatedCards = cards.filter((card) => card.id !== cardId);
		setCards(updatedCards);
		store.dispatch(DeckActions.setAddedCards(updatedCards));
		setCurrentCard(null);
	};

	const onCancelDeleteCard = () => {
		setCurrentCard(null);
	};

	const onCancelConfirmation = () => {
		store.dispatch(DeckActions.setAddedCards([]));
		setCurrentCard(null);
		setCards([]);
		history.goBack();
	};

	const onSubmitDeckName = () => {
		store.dispatch(
			DeckActions.setSelectedDeck({
				...selectedDeck,
				deckName,
			})
		);
		setPhase(PHASES.CREATE);
	};

	const onFinishDeck = async (e) => {
		e.preventDefault();

		const deckPayload = {
			deckName,
			timestamp: Date.now(),
			author: username,
			userId: _id,
			cards,
		};

		try {
			const result = await createDeck(deckPayload);
			store.dispatch(DeckActions.addDeck(result.data.data));
			history.push("/home");
		} catch (e) {
			console.log("\n\n error in creating deck = ", e, "\n\n");
			setError(ERROR_MESSAGE.FINISH_CARD.GENERIC);
		}
	};

	return (
		<div className={styles.createDeckContent}>
			{phase === PHASES.NAME && (
				<NameDeckForm
					deckName={deckName}
					setDeckName={setDeckName}
					submitName={onSubmitDeckName}
				/>
			)}
			{phase === PHASES.FINISH && (
				<FinishDeckForm
					title={deckName}
					cards={cards}
					onCancel={() => setPhase(PHASES.CREATE)}
					onSubmitDeck={onFinishDeck}
				/>
			)}
			{phase === PHASES.CANCEL_CONFIRM && (
				<div className={styles.cancelEditDeck}>
					<AbortActionConfirmationModal
						message="You really wanna cancel? All of your progress will be lost."
						deleteFunc={onCancelConfirmation}
						cancelFunc={() => {
							setPhase(PHASES.CREATE);
						}}
						btnWording="Abandon Deck"
					/>
				</div>
			)}
			{phase === PHASES.CREATE && (
				<div className={styles.createDeckForm}>
					{isEdit && !currentCard ? (
						<EditDeckActionCard
							deckName={deckName}
							onAddCard={onAddCardClick}
						/>
					) : (
						<CreateCardForm
							error={error}
							currentCard={currentCard || {}}
							submitCard={onSubmitCard}
							editCard={onEditCard}
							deleteCard={onDeleteCard}
							cancelDeleteCard={onCancelDeleteCard}
							isEdit={editingAddedCard}
						/>
					)}
					<div className={styles.actions}>
						<button
							disabled={cards.length === 0}
							className={styles.finishBtn}
							onClick={() => setPhase(PHASES.FINISH)}
							type="button"
						>
							Finish
						</button>
						<button
							className={styles.cancelBtn}
							onClick={() => setPhase(PHASES.CANCEL_CONFIRM)}
							type="button"
						>
							Cancel
						</button>
					</div>
				</div>
			)}
			<AddedCards onClick={onAddedCardClick} cards={cards} />
		</div>
	);
};

export default CreateDeckContent;
