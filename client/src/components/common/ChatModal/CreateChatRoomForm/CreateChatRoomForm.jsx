import React, { useState } from "react";
import classNames from "classnames";
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
		<div className={styles.container}>
			<div className={styles.pageHeader}>
				<h2 className={styles.pageHeaderText}>Create Chat Room</h2>
			</div>
			<form className={styles.createRoomForm} onSubmit={onSubmitRoom}>
				<div className={styles.formHeader}>Name the Room</div>
				<div className={styles.inputField}>
					<label
						className={classNames(styles.label, {
							[styles.gray]: !name.length,
						})}
						htmlFor="roomName"
						aria-label="form name"
					>
						Name:
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
		</div>
	);
};

export default CreateChatRoomForm;
