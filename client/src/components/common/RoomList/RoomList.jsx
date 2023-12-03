import React from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ChatRoomActionButton from "../ChatRoomActionButton";
import RoomListItem from "../RoomListItem";
import styles from "./RoomList.module.css";

const RoomList = ({ rooms, email }) => {
	const history = useHistory();

	const onBackClick = () => history.goBack();

	return (
		<div className={styles.roomListContent}>
			<div className={styles.pageHeader}>
				<div className={styles.backButton} onClick={onBackClick}>
					<FontAwesomeIcon
						icon={faArrowLeft}
						size="2x"
						style={{ color: "inherit" }}
					/>
					<p className={styles.backButtonLabel}>Back</p>
				</div>
				<h2 className={styles.pageHeaderText}>Flip with Friends</h2>
				<div />
			</div>
			<div className={styles.roomListContainer}>
				<div className={styles.roomListHeader}>Join a Room</div>
				<div className={styles.roomList}>
					{rooms.length ? (
						rooms.map((room) => (
							<RoomListItem
								key={room.id}
								room={room}
								email={email}
							/>
						))
					) : (
						<p>There are currently no chat rooms</p>
					)}
				</div>
			</div>
			<ChatRoomActionButton type="create" />
		</div>
	);
};

export default RoomList;
