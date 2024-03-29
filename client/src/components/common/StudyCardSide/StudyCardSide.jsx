import React from "react";
import { SIDES } from "../../../utils/constants";
import styles from "./StudyCardSide.module.css";
import classNames from "classnames";

const StudyCardSide = ({ onFlip, value, side, flipWithFriends }) => {
	return (
		<div
			className={classNames(styles.studyCardSide, {
				[styles.flipWithFriendsCard]: flipWithFriends,
			})}
		>
			<div className={styles.headerSpace}>{side}</div>
			<div className={styles.sideValue}>
				<p
					className={classNames(styles.frontValue, {
						[styles.backValue]: side === SIDES.FRONT,
					})}
				>
					{value}
				</p>
			</div>
			{!flipWithFriends && (
				<button
					className={styles.flipCardBtn}
					type="button"
					onClick={onFlip}
				>
					-Flip-
				</button>
			)}
		</div>
	);
};

export default StudyCardSide;
