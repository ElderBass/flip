import React, { useState } from "react";
import { createRoom } from "../../../../api/socket";
import store from "../../../../store";
import * as ChatActions from "../../../../store/actions/chat";
import styles from "./CreateChatRoomForm.module.css";

const CreateChatRoomForm = () => {
	const [name, setName] = useState("");

	const onChange = (e) => setName(e.target.value);

	const resetModal = () => {
		setName("");
		store.dispatch(ChatActions.setModal(null));
	};

	const onSubmitRoom = (e) => {
		e.preventDefault();
		createRoom(name);
		resetModal();
	};

	return (
		<form className={styles.createRoomForm} onSubmit={onSubmitRoom}>
			<div className={styles.header}>Create Chat Room</div>
			<div className={styles.inputField}>
				<label
					className={styles.label}
					htmlFor="roomName"
					aria-label="form name"
				>
					Give this Room a name:
				</label>
				<input
					className={styles.input}
					id="roomName"
					value={name}
					onChange={onChange}
					placeholder="Names must not exceed 24 characters"
				/>
			</div>
			<div className={styles.actions}>
				<button
					className={styles.cancel}
					type="button"
					onClick={resetModal}
				>
					Cancel
				</button>
				<button
					disabled={!name.length}
					className={styles.confirm}
					type="submit"
				>
					Create Room
				</button>
			</div>
		</form>
	);
};

export default CreateChatRoomForm;
